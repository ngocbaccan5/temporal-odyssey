"""
Temporal Odyssey — FastAPI Server
"""
import os, httpx
from contextlib import asynccontextmanager

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import init_db, get_db, SessionLocal, User, JournalEntry, PlayedCount, QuizAttempt
from auth import hash_password, verify_password, create_token, get_current_user, get_optional_user
from schemas import (
    UserRegister, UserLogin, TokenResponse, ProfileResponse, ProfileUpdate,
    XPAward, XPRedeem, PlayedUpdate, JournalEntryCreate, AdminVerify, ChatRequest,
    QuizRequest, QuizAnswer
)

ADMIN_KEY = os.getenv("ADMIN_KEY", "temporal_admin_2026")
_IS_PRODUCTION = os.getenv("ENV", "development").lower() == "production"
_SEED_DEMO_USERS = os.getenv("SEED_DEMO_USERS", "false").lower() in ("1", "true", "yes")
_ENABLE_ADMIN_BOOTSTRAP = os.getenv("ENABLE_ADMIN_BOOTSTRAP", "false").lower() in ("1", "true", "yes")

# ── Rate Limiter ──
limiter = Limiter(key_func=get_remote_address, default_limits=["120/minute"])


# ── Startup / Shutdown ──
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    db = SessionLocal()
    try:
        # Demo accounts — only when explicitly enabled (never in production)
        if _SEED_DEMO_USERS:
            if not db.query(User).filter(User.username == "datascience").first():
                db.add(User(
                    username="datascience",
                    hashed_password=hash_password("uneti"),
                    xp=120, free_left=5
                ))
            for tname, tpass in [("tester1","test2026"),("tester2","test2026"),("tester3","test2026")]:
                if not db.query(User).filter(User.username == tname).first():
                    db.add(User(
                        username=tname,
                        hashed_password=hash_password(tpass),
                        xp=9999, free_left=99, is_admin=True
                    ))

        # Admin bootstrap — only when explicitly enabled (never in production)
        if _ENABLE_ADMIN_BOOTSTRAP:
            if not db.query(User).filter(User.username == "admin").first():
                _admin_pass = os.getenv("ADMIN_BOOTSTRAP_PASSWORD", "")
                if not _admin_pass:
                    raise RuntimeError(
                        "ENABLE_ADMIN_BOOTSTRAP=true requires ADMIN_BOOTSTRAP_PASSWORD env var"
                    )
                db.add(User(
                    username="admin",
                    hashed_password=hash_password(_admin_pass),
                    xp=9999, free_left=99, is_admin=True
                ))

        db.commit()
    finally:
        db.close()
    yield


_docs_url = None if _IS_PRODUCTION else "/docs"
_redoc_url = None if _IS_PRODUCTION else "/redoc"

app = FastAPI(
    title="Temporal Odyssey API",
    description="""
## 🏛️ Temporal Odyssey — Vietnamese History Learning Game API

### Xác thực (Authentication)
- Đăng ký/Đăng nhập để nhận **JWT Bearer Token**
- Gửi header: `Authorization: Bearer <token>`

### Tài khoản test
| Username | Password | XP | Free Plays | Admin |
|---|---|---|---|---|
| `admin` | `admin2026` | 9999 | 99 (∞) | ✅ |
| `tester1` | `test2026` | 9999 | 99 (∞) | ✅ |
| `tester2` | `test2026` | 9999 | 99 (∞) | ✅ |
| `tester3` | `test2026` | 9999 | 99 (∞) | ✅ |
| `datascience` | `uneti` | 120 | 5 | ❌ |

### Luồng chơi game
1. **POST /api/login** → Nhận token
2. **GET /api/quiz/{event_id}** → Lấy 3 câu hỏi ngẫu nhiên
3. **POST /api/quiz/check** → Nộp bài, cần ≥ 2/3 đúng để qua màn
4. **POST /api/award-xp** → Cộng XP khi hoàn thành

### Đổi XP lấy lượt chơi
- 50 XP → 3 lượt | 100 XP → 8 lượt | 200 XP → 99 lượt (∞)
""",
    version="2.0.0",
    docs_url=_docs_url,
    redoc_url=_redoc_url,
    lifespan=lifespan
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS / Trusted Hosts / Security Headers ──
def _csv_env(name: str, default: str = "") -> list[str]:
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


def _unique(items: list[str]) -> list[str]:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result


_RENDER_EXTERNAL_HOSTNAME = os.getenv("RENDER_EXTERNAL_HOSTNAME", "").strip()
_ALLOWED_ORIGINS = _csv_env(
    "ALLOWED_ORIGINS",
    "http://localhost:5500,http://127.0.0.1:5500,http://localhost:8000",
)
if _RENDER_EXTERNAL_HOSTNAME:
    _ALLOWED_ORIGINS.append(f"https://{_RENDER_EXTERNAL_HOSTNAME}")
_ALLOWED_ORIGINS = _unique(_ALLOWED_ORIGINS)
_ALLOWED_ORIGIN_REGEX = os.getenv(
    "ALLOWED_ORIGIN_REGEX",
    r"https://.*\.onrender\.com" if (_IS_PRODUCTION or _RENDER_EXTERNAL_HOSTNAME) else "",
).strip() or None

_ALLOWED_HOSTS = _csv_env("ALLOWED_HOSTS", "localhost,127.0.0.1")
if _RENDER_EXTERNAL_HOSTNAME:
    _ALLOWED_HOSTS.append(_RENDER_EXTERNAL_HOSTNAME)
if _IS_PRODUCTION or _RENDER_EXTERNAL_HOSTNAME:
    _ALLOWED_HOSTS.append("*.onrender.com")
_ALLOWED_HOSTS = _unique(_ALLOWED_HOSTS)

app.mount("/static", StaticFiles(directory="static"), name="static")
if _ALLOWED_HOSTS:
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=_ALLOWED_HOSTS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_ALLOWED_ORIGINS,
    allow_origin_regex=_ALLOWED_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


# ══════════════════════════════════════
#  AUTH ENDPOINTS
# ══════════════════════════════════════

@app.post("/api/register", response_model=TokenResponse, tags=["Auth"], summary="Đăng ký tài khoản mới")
@limiter.limit("5/minute")
async def register(request: Request, data: UserRegister, db: Session = Depends(get_db)):
    """
    Tạo tài khoản mới và nhận JWT token.

    - **username**: 3-30 ký tự, chỉ chữ/số/gạch dưới, không khoảng trắng
    - **password**: 6-72 ký tự
    - Tài khoản mới nhận: 120 XP, 5 lượt chơi miễn phí
    - Rate limit: 5 lần/phút
    """
    existing = db.query(User).filter(
        func.lower(User.username) == data.username.lower()
    ).first()
    if existing:
        raise HTTPException(400, "Tên đăng nhập đã tồn tại")

    user = User(
        username=data.username,
        hashed_password=hash_password(data.password),
        xp=120, free_left=5
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_token(user.id, user.username)
    return TokenResponse(
        access_token=token, username=user.username,
        xp=user.xp, free_left=user.free_left
    )


@app.post("/api/login", response_model=TokenResponse, tags=["Auth"], summary="Đăng nhập")
@limiter.limit("60/minute")
async def login(request: Request, data: UserLogin, db: Session = Depends(get_db)):
    """
    Đăng nhập và nhận JWT Bearer token.

    - Gửi token trong header: `Authorization: Bearer <token>`
    - Token dùng cho mọi endpoint yêu cầu xác thực
    - Rate limit: 60 lần/phút
    """
    user = db.query(User).filter(
        func.lower(User.username) == data.username.lower()
    ).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(401, "Sai tên đăng nhập hoặc mật khẩu")

    token = create_token(user.id, user.username)
    return TokenResponse(
        access_token=token, username=user.username,
        xp=user.xp, free_left=user.free_left
    )


# ══════════════════════════════════════
#  PROFILE
# ══════════════════════════════════════

@app.get("/api/profile", response_model=ProfileResponse, tags=["Profile"], summary="Xem hồ sơ người chơi")
async def get_profile(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Trả về hồ sơ đầy đủ: XP, lượt chơi, số màn đã chơi, nhật ký (60 entry gần nhất)."""
    played = {}
    for pc in db.query(PlayedCount).filter(PlayedCount.user_id == user.id).all():
        played[pc.category] = pc.count

    journal = (
        db.query(JournalEntry)
        .filter(JournalEntry.user_id == user.id)
        .order_by(JournalEntry.created_at.desc())
        .limit(60)
        .all()
    )
    journal_list = [{
        "time": j.created_at.isoformat() if j.created_at else "",
        "type": j.entry_type,
        "title": j.title,
        "details": j.details,
        "category": j.category,
        "year": j.year,
        "eventId": j.event_id,
        "xpDelta": j.xp_delta
    } for j in journal]

    return ProfileResponse(
        username=user.username, xp=user.xp, free_left=user.free_left,
        is_admin=user.is_admin, played=played, journal=journal_list
    )


@app.put("/api/profile", tags=["Profile"], summary="Cập nhật hồ sơ")
async def update_profile(
    data: ProfileUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # XP and free_left are privileged fields — admin only
    if (data.xp is not None or data.free_left is not None) and not user.is_admin:
        raise HTTPException(403, "Chỉ admin mới được cập nhật XP hoặc lượt chơi")
    if data.xp is not None:
        user.xp = max(0, min(data.xp, 999999))
    if data.free_left is not None:
        user.free_left = max(0, min(data.free_left, 99))
    db.commit()
    return {"ok": True, "xp": user.xp, "free_left": user.free_left}


# ══════════════════════════════════════
#  XP & FREE PLAYS
# ══════════════════════════════════════

@app.post("/api/award-xp", tags=["XP & Lượt chơi"], summary="Cộng XP cho người chơi")
async def award_xp(
    data: XPAward,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # In production: only admin can call this endpoint directly.
    # In development: any authenticated user may call it (for local testing).
    if _IS_PRODUCTION and not user.is_admin:
        raise HTTPException(403, "XP chỉ được cộng qua server trong production")
    amount = max(0, min(data.amount, 500))
    user.xp = min(user.xp + amount, 999999)

    entry = JournalEntry(
        user_id=user.id, entry_type=data.entry_type, title=data.title,
        details=data.details, category=data.category, year=data.year,
        event_id=data.event_id, xp_delta=amount
    )
    db.add(entry)
    db.commit()
    return {"ok": True, "xp": user.xp, "awarded": amount}


@app.post("/api/redeem-xp", tags=["XP & Lượt chơi"], summary="Đổi XP lấy lượt chơi")
async def redeem_xp(
    data: XPRedeem,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    REWARDS = {50: 3, 100: 8, 200: 99}
    if user.xp < data.cost:
        raise HTTPException(400, f"Không đủ XP! Cần {data.cost}, hiện có {user.xp}")

    gain = REWARDS[data.cost]
    user.xp -= data.cost
    if gain == 99:
        user.free_left = 99
    else:
        user.free_left = min(99, max(0, user.free_left) + gain)
    db.commit()
    return {"ok": True, "xp": user.xp, "free_left": user.free_left, "gained": gain}


@app.post("/api/consume-play", tags=["XP & Lượt chơi"], summary="Trừ 1 lượt chơi")
async def consume_play(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.free_left != 99:
        user.free_left = max(0, user.free_left - 1)
    db.commit()
    return {"ok": True, "free_left": user.free_left}


# ══════════════════════════════════════
#  PLAYED COUNTS
# ══════════════════════════════════════

@app.post("/api/played", tags=["Thống kê"], summary="Tăng số màn đã chơi")
async def record_played(
    data: PlayedUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    pc = db.query(PlayedCount).filter(
        PlayedCount.user_id == user.id,
        PlayedCount.category == data.category
    ).first()
    if pc:
        pc.count += 1
    else:
        pc = PlayedCount(user_id=user.id, category=data.category, count=1)
        db.add(pc)
    db.commit()
    return {"ok": True, "category": data.category, "count": pc.count}


@app.get("/api/played", tags=["Thống kê"], summary="Xem số màn đã chơi")
async def get_played(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return {
        pc.category: pc.count
        for pc in db.query(PlayedCount).filter(PlayedCount.user_id == user.id).all()
    }


# ══════════════════════════════════════
#  JOURNAL
# ══════════════════════════════════════

@app.post("/api/journal", tags=["Nhật ký"], summary="Ghi nhật ký hoạt động")
async def add_journal(
    data: JournalEntryCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    entry = JournalEntry(
        user_id=user.id, entry_type=data.entry_type,
        title=data.title[:200], details=data.details[:1000],
        category=data.category, year=data.year,
        event_id=data.event_id, xp_delta=data.xp_delta
    )
    db.add(entry)
    db.commit()
    return {"ok": True}


@app.get("/api/journal", tags=["Nhật ký"], summary="Xem nhật ký (60 entry gần nhất)")
async def get_journal(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    entries = (
        db.query(JournalEntry)
        .filter(JournalEntry.user_id == user.id)
        .order_by(JournalEntry.created_at.desc())
        .limit(60)
        .all()
    )
    return [{
        "time": e.created_at.isoformat() if e.created_at else "",
        "type": e.entry_type,
        "title": e.title,
        "details": e.details,
        "category": e.category,
        "year": e.year,
        "eventId": e.event_id,
        "xpDelta": e.xp_delta
    } for e in entries]


# ══════════════════════════════════════
#  LEADERBOARD
# ══════════════════════════════════════

@app.get("/api/leaderboard", tags=["Thống kê"], summary="Bảng xếp hạng top 50")
async def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.xp.desc()).limit(50).all()
    result = []
    for u in users:
        jcount = (
            db.query(func.count(JournalEntry.id))
            .filter(JournalEntry.user_id == u.id)
            .scalar()
        )
        result.append({
            "username": u.username,
            "xp": u.xp,
            "free_left": u.free_left,
            "journal_count": jcount or 0
        })
    return result


# ══════════════════════════════════════
#  ADMIN
# ══════════════════════════════════════

@app.post("/api/admin/verify", tags=["Admin"], summary="Xác thực quyền admin")
@limiter.limit("3/minute")
async def admin_verify(
    request: Request,
    data: AdminVerify,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if data.password != ADMIN_KEY:
        raise HTTPException(403, "Sai mã truy cập")
    user.is_admin = True
    db.commit()
    return {"ok": True}


@app.get("/api/admin/users", tags=["Admin"], summary="Danh sách tất cả users")
async def admin_list_users(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not user.is_admin:
        raise HTTPException(403, "Không có quyền quản trị")
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [{
        "id": u.id,
        "username": u.username,
        "xp": u.xp,
        "free_left": u.free_left,
        "is_admin": u.is_admin,
        "created_at": u.created_at.isoformat() if u.created_at else "",
        "journal_count": (
            db.query(func.count(JournalEntry.id))
            .filter(JournalEntry.user_id == u.id).scalar() or 0
        )
    } for u in users]


@app.delete("/api/admin/users/{user_id}", tags=["Admin"], summary="Xóa tài khoản")
async def admin_delete_user(
    user_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not user.is_admin:
        raise HTTPException(403, "Không có quyền quản trị")
    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(404, "Không tìm thấy tài khoản")
    if target.id == user.id:
        raise HTTPException(400, "Không thể xóa chính mình")
    db.delete(target)
    db.commit()
    return {"ok": True}


# ══════════════════════════════════════
#  AI CHATBOT — Gemini
# ══════════════════════════════════════

GEMINI_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models"
# Models to try in order (fallback chain)
GEMINI_MODELS = ["gemini-2.5-flash", "gemma-3-4b-it"]

SYSTEM_PROMPT = (
    "Bạn là trợ lý lịch sử Việt Nam trong ứng dụng Temporal Odyssey. "
    "Trả lời bằng tiếng Việt, ngắn gọn (dưới 200 từ), chính xác. "
    "Chỉ trả lời câu hỏi liên quan đến lịch sử, văn hóa, truyền thuyết Việt Nam. "
    "Nếu câu hỏi ngoài phạm vi, lịch sự từ chối và gợi ý hỏi về lịch sử VN. "
    "Không dùng emoji. Dùng format markdown khi cần (bold, list)."
)


@app.post("/api/chat", tags=["AI Chat"], summary="Chat với AI lịch sử")
@limiter.limit("15/minute")
async def ai_chat(req: ChatRequest, request: Request):
    import asyncio
    if not GEMINI_KEY:
        raise HTTPException(503, "AI chưa được cấu hình. Thêm GEMINI_API_KEY vào .env")
    user_msg = req.message.strip()
    if not user_msg or len(user_msg) > 500:
        raise HTTPException(400, "Tin nhắn không hợp lệ")

    # Gemini models support system_instruction; Gemma models don't
    payload_with_sys = {
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": [{"parts": [{"text": user_msg}]}],
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 600},
    }
    payload_no_sys = {
        "contents": [{"parts": [{"text": SYSTEM_PROMPT + "\n\nUser: " + user_msg}]}],
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 600},
    }

    last_error = None
    async with httpx.AsyncClient(timeout=20) as client:
        for model in GEMINI_MODELS:
            url = f"{GEMINI_BASE}/{model}:generateContent?key={GEMINI_KEY}"
            is_gemma = model.startswith("gemma")
            payload = payload_no_sys if is_gemma else payload_with_sys
            for attempt in range(2):
                try:
                    resp = await client.post(url, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["candidates"][0]["content"]["parts"][0]["text"]
                        return {"reply": text}
                    last_error = f"{model}: HTTP {resp.status_code}"
                    if resp.status_code == 503:
                        await asyncio.sleep(1 + attempt)
                        continue
                    break
                except Exception as e:
                    last_error = f"{model}: {type(e).__name__}"

    raise HTTPException(502, f"AI tạm thời không khả dụng. ({last_error})")


# ══════════════════════════════════════
#  QUIZ SYSTEM
# ══════════════════════════════════════

import json, random

# Load quiz bank on startup
QUIZ_BANK = {}
_quiz_path = os.path.join(os.path.dirname(__file__), "static", "quiz_bank.json")
if os.path.isfile(_quiz_path):
    with open(_quiz_path, "r", encoding="utf-8") as _f:
        QUIZ_BANK = json.load(_f)


@app.get("/api/quiz/{event_id}", tags=["Quiz"], summary="Lấy câu hỏi trắc nghiệm")
async def get_quiz(
    event_id: str,
    user=Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    Trả về 3 câu hỏi ngẫu nhiên cho sự kiện lịch sử.

    - Tránh lặp câu đã trả lời trước đó (dựa trên QuizAttempt)
    - Khi hết câu mới → reset, cho phép lặp lại
    - **Không trả về đáp án** — đáp án chỉ có ở POST /api/quiz/check
    - Mỗi câu có: id, q (câu hỏi), opts (đáp án A-D), difficulty (easy/medium/hard)
    - Không bắt buộc đăng nhập — nếu có token sẽ tránh lặp câu
    """
    if event_id not in QUIZ_BANK or not QUIZ_BANK[event_id]:
        raise HTTPException(404, "Chưa có câu hỏi cho sự kiện này")

    all_questions = QUIZ_BANK[event_id]

    # Get question IDs this user has already seen for this event
    seen_ids = set()
    if user:
        prev_attempts = (
            db.query(QuizAttempt)
            .filter(QuizAttempt.user_id == user.id, QuizAttempt.event_id == event_id)
            .all()
        )
        for att in prev_attempts:
            if att.question_ids:
                seen_ids.update(int(x) for x in att.question_ids.split(",") if x.strip())

    # Filter unseen questions
    unseen = [q for q in all_questions if q.get("id") not in seen_ids]
    if len(unseen) < 3:
        # Reset: allow all questions again
        unseen = all_questions

    # Pick 3 random questions
    selected = random.sample(unseen, min(3, len(unseen)))

    # Return questions WITHOUT answers
    safe_questions = []
    for q in selected:
        safe_questions.append({
            "id": q["id"],
            "q": q["q"],
            "opts": q["opts"],
            "difficulty": q.get("difficulty", "medium"),
        })

    return {"event_id": event_id, "questions": safe_questions}


@app.post("/api/quiz/check", tags=["Quiz"], summary="Nộp bài kiểm tra")
async def check_quiz(
    data: QuizAnswer,
    user=Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    Chấm bài kiểm tra trắc nghiệm.

    - Gửi: event_id + answers (list [{question_id, selected}])
    - Trả về: score, total, passed (≥2/3 = pass), results chi tiết
    - Tự động lưu QuizAttempt vào database (nếu đã đăng nhập)
    - **Cần đạt ≥ 2/3 câu đúng** để qua màn
    """
    if data.event_id not in QUIZ_BANK:
        raise HTTPException(404, "Event không tồn tại")

    all_questions = QUIZ_BANK[data.event_id]
    q_map = {q["id"]: q for q in all_questions}

    score = 0
    total = len(data.answers)
    results = []

    for ans in data.answers:
        qid = ans.get("question_id") or ans.get("id")
        selected = ans.get("selected", -1)
        q = q_map.get(qid)
        if q:
            correct = selected == q["ans"]
            if correct:
                score += 1
            results.append({
                "question_id": qid,
                "selected": selected,
                "correct_ans": q["ans"],
                "is_correct": correct,
            })

    passed = score >= 2  # Need 2/3 to pass

    # Save attempt (only if authenticated)
    if user:
        question_ids = ",".join(str(a.get("question_id") or a.get("id", 0)) for a in data.answers)
        attempt = QuizAttempt(
            user_id=user.id,
            event_id=data.event_id,
            question_ids=question_ids,
            score=score,
            total=total,
            passed=passed,
        )
        db.add(attempt)
        db.commit()

    return {
        "score": score,
        "total": total,
        "passed": passed,
        "results": results,
    }


# ══════════════════════════════════════
#  STATIC FILES + INDEX
# ══════════════════════════════════════

static_dir = os.path.join(os.path.dirname(__file__), "static")


@app.get("/")
async def serve_index():
    index_path = os.path.join(static_dir, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(
            index_path, media_type="text/html",
            headers={"Cache-Control": "no-cache, no-store, must-revalidate"}
        )
    return {"message": "Temporal Odyssey API", "docs": "/docs"}


@app.get("/{full_path:path}", include_in_schema=False)
async def spa_fallback(full_path: str):
    """SPA catch-all: serve index.html for any unknown frontend path.
    API and static paths are NOT served here — they're handled earlier."""
    if full_path.startswith("api/") or full_path.startswith("api"):
        from fastapi.responses import JSONResponse
        return JSONResponse({"detail": "Not Found"}, status_code=404)
    if full_path.startswith("static/"):
        from fastapi.responses import JSONResponse
        return JSONResponse({"detail": "Not Found"}, status_code=404)
    index_path = os.path.join(static_dir, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(
            index_path, media_type="text/html",
            headers={"Cache-Control": "no-cache, no-store, must-revalidate"}
        )
    from fastapi.responses import JSONResponse
    return JSONResponse({"detail": "Not Found"}, status_code=404)


# ══════════════════════════════════════
#  ENTRY POINT
# ══════════════════════════════════════

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=bool(os.getenv("DEBUG")),
        workers=1
    )
