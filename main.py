"""
Temporal Odyssey — FastAPI Server
"""
import logging, os, re, secrets, time, unicodedata, httpx
from contextlib import asynccontextmanager

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from slowapi import Limiter
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

ENV = os.getenv("ENV", "development").strip().lower()
IS_PRODUCTION = ENV == "production"
REQUEST_LOGGER = logging.getLogger("uvicorn.error")


def _bool_env(name: str, default: bool = False) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on"}


def _csv_env(name: str, default: str = "") -> list[str]:
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


API_RATE_LIMIT = os.getenv("API_RATE_LIMIT", "120/minute")
LOGIN_RATE_LIMIT = os.getenv("LOGIN_RATE_LIMIT", "10/minute")
REGISTER_RATE_LIMIT = os.getenv("REGISTER_RATE_LIMIT", "5/minute")
CHAT_RATE_LIMIT = os.getenv("CHAT_RATE_LIMIT", "15/minute")
ADMIN_RATE_LIMIT = os.getenv("ADMIN_RATE_LIMIT", "3/minute")
MAX_REQUEST_BYTES = int(os.getenv("MAX_REQUEST_BYTES", "1048576"))
ENABLE_CSP = _bool_env("ENABLE_CSP", True)
AI_HTTP_TIMEOUT_SECONDS = float(os.getenv("AI_HTTP_TIMEOUT_SECONDS", "2"))
AI_TOTAL_TIMEOUT_SECONDS = float(os.getenv("AI_TOTAL_TIMEOUT_SECONDS", "3"))

SHOW_DOCS = _bool_env("SHOW_DOCS", not IS_PRODUCTION)
DEBUG_HTTP_LOG = _bool_env("DEBUG_HTTP_LOG", False)
SEED_DEMO_USERS = _bool_env("SEED_DEMO_USERS", not IS_PRODUCTION)
ENABLE_ADMIN_BOOTSTRAP = _bool_env("ENABLE_ADMIN_BOOTSTRAP", not IS_PRODUCTION)
CORS_ALLOW_CREDENTIALS = _bool_env("CORS_ALLOW_CREDENTIALS", False)
ALLOWED_HOSTS = _csv_env("ALLOWED_HOSTS", "")
ALLOWED_ORIGINS = _csv_env(
    "ALLOWED_ORIGINS",
    "http://localhost:8000,http://127.0.0.1:8000,http://localhost:5500,http://127.0.0.1:5500"
)

ADMIN_KEY = os.getenv("ADMIN_KEY", "").strip()
_WEAK_SECRET_MARKERS = ("changeme", "change-this", "your-", "placeholder", "admin_2026", "admin123")
if IS_PRODUCTION:
    if not ALLOWED_HOSTS:
        raise RuntimeError("ALLOWED_HOSTS must be set in production.")
    if not ALLOWED_ORIGINS or "*" in ALLOWED_ORIGINS:
        raise RuntimeError("ALLOWED_ORIGINS must list explicit HTTPS origins in production.")
    if any(not origin.startswith("https://") for origin in ALLOWED_ORIGINS):
        raise RuntimeError("ALLOWED_ORIGINS must use HTTPS in production.")
    if len(ADMIN_KEY) < 32 or any(marker in ADMIN_KEY.lower() for marker in _WEAK_SECRET_MARKERS):
        raise RuntimeError("ADMIN_KEY must be set to a strong random value in production.")
else:
    ADMIN_KEY = ADMIN_KEY or "dev-admin-key-change-me"

# ── Rate Limiter ──
limiter = Limiter(key_func=get_remote_address, default_limits=[API_RATE_LIMIT])


class SafeStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        normalized = path.replace("\\", "/").lower()
        parts = normalized.split("/")
        blocked_suffixes = (".env", ".db", ".sqlite", ".sqlite3", ".bak", ".backup", ".recovery")
        blocked_markers = (".bak-", ".bak_", "~")
        if (
            any(part.startswith(".") for part in parts)
            or normalized.endswith(blocked_suffixes)
            or any(marker in normalized for marker in blocked_markers)
        ):
            raise StarletteHTTPException(status_code=404)
        return await super().get_response(path, scope)


# ── Startup / Shutdown ──
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables + seed demo user
    init_db()
    db = SessionLocal()
    try:
        if SEED_DEMO_USERS and not db.query(User).filter(User.username == "datascience").first():
            db.add(User(
                username="datascience",
                hashed_password=hash_password("uneti"),
                xp=120,
                free_left=5,
                is_admin=False,
            ))
        db.commit()
    finally:
        db.close()
    if DEBUG_HTTP_LOG:
        REQUEST_LOGGER.warning("[HTTP] request logger enabled")
    yield


app = FastAPI(
    title="Temporal Odyssey API",
    description="""
## 🏛️ Temporal Odyssey — Vietnamese History Learning Game API

### Xác thực (Authentication)
- Đăng ký/Đăng nhập để nhận **JWT Bearer Token**
- Gửi header: `Authorization: Bearer <token>`

### Demo accounts
Demo seeding is controlled by `SEED_DEMO_USERS` and is disabled by default in production.

### Luồng chơi game
1. **POST /api/login** → Nhận token
2. **GET /api/quiz/{event_id}** → Lấy 3 câu hỏi ngẫu nhiên
3. **POST /api/quiz/check** → Nộp bài, cần ≥ 2/3 đúng để qua màn
4. **POST /api/award-xp** → Cộng XP khi hoàn thành

### Đổi XP lấy lượt chơi
- 50 XP → 3 lượt | 100 XP → 8 lượt | 200 XP → 99 lượt (∞)
""",
    version="2.0.0",
    docs_url="/docs" if SHOW_DOCS else None,
    redoc_url="/redoc" if SHOW_DOCS else None,
    lifespan=lifespan
)

app.state.limiter = limiter


async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please try again later."},
    )


app.add_exception_handler(RateLimitExceeded, rate_limit_handler)

if ALLOWED_HOSTS:
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=ALLOWED_HOSTS)

# ── CORS: cho phép domain thật khi deploy, wildcard chỉ dùng local ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=CORS_ALLOW_CREDENTIALS,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.middleware("http")
async def enforce_request_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length:
        try:
            if int(content_length) > MAX_REQUEST_BYTES:
                return JSONResponse(
                    {"detail": "Request body too large"},
                    status_code=413,
                )
        except ValueError:
            return JSONResponse(
                {"detail": "Invalid Content-Length"},
                status_code=400,
            )
    return await call_next(request)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault("Cross-Origin-Opener-Policy", "same-origin")
    response.headers.setdefault("X-Permitted-Cross-Domain-Policies", "none")
    response.headers.setdefault(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()",
    )
    if ENABLE_CSP:
        response.headers.setdefault(
            "Content-Security-Policy",
            "default-src 'self'; "
            "base-uri 'self'; "
            "object-src 'none'; "
            "frame-ancestors 'none'; "
            "img-src 'self' data: blob:; "
            "media-src 'self' blob:; "
            "style-src 'self' 'unsafe-inline'; "
            "script-src 'self' 'unsafe-inline'; "
            "connect-src 'self'; "
            "frame-src https://www.youtube-nocookie.com;"
        )
    if IS_PRODUCTION:
        response.headers.setdefault(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
        )
    return response


@app.middleware("http")
async def log_http_requests(request: Request, call_next):
    if not DEBUG_HTTP_LOG:
        return await call_next(request)

    started = time.perf_counter()
    path = request.url.path
    if request.url.query:
        path = f"{path}?[query]"

    try:
        response = await call_next(request)
    except Exception:
        elapsed_ms = (time.perf_counter() - started) * 1000
        REQUEST_LOGGER.warning("[HTTP] %s %s -> 500 (%.1f ms)", request.method, path, elapsed_ms)
        raise

    elapsed_ms = (time.perf_counter() - started) * 1000
    REQUEST_LOGGER.warning("[HTTP] %s %s -> %s (%.1f ms)", request.method, path, response.status_code, elapsed_ms)
    return response


@app.post("/api/client-log")
@limiter.limit(API_RATE_LIMIT)
async def client_log(request: Request):
    if not DEBUG_HTTP_LOG:
        return {"ok": True}

    try:
        payload = await request.json()
    except Exception:
        payload = {}

    event_type = str(payload.get("type") or "event")[:32]
    path = str(payload.get("path") or "")[:160]
    detail = payload.get("detail") or {}
    if not isinstance(detail, dict):
        detail = {"value": str(detail)[:160]}

    summary_bits = []
    for key in ("method", "url", "status", "tag", "id", "text", "onclick"):
        value = detail.get(key)
        if value not in (None, ""):
            text = str(value)[:120]
            if any(marker in f"{key}={text}".lower() for marker in ("token", "key", "password", "secret", "authorization")):
                text = "[redacted]"
            summary_bits.append(f"{key}={text}")

    summary = " ".join(summary_bits) if summary_bits else str(detail)[:220]
    REQUEST_LOGGER.warning("[CLIENT] %s path=%s %s", event_type, path, summary)
    return {"ok": True}


# ══════════════════════════════════════
#  AUTH ENDPOINTS
# ══════════════════════════════════════

@app.post("/api/register", response_model=TokenResponse, tags=["Auth"], summary="Đăng ký tài khoản mới")
@limiter.limit(REGISTER_RATE_LIMIT)
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
@limiter.limit(LOGIN_RATE_LIMIT)
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
    if IS_PRODUCTION and not user.is_admin:
        raise HTTPException(403, "Direct profile mutation is disabled in production")
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
@limiter.limit(ADMIN_RATE_LIMIT)
async def admin_verify(
    request: Request,
    data: AdminVerify,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not ENABLE_ADMIN_BOOTSTRAP:
        raise HTTPException(403, "Admin bootstrap is disabled")
    if not secrets.compare_digest(data.password, ADMIN_KEY):
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


CHAT_FALLBACKS = {
    "lac long quan": "Lạc Long Quân là nhân vật truyền thuyết gắn với nguồn gốc dân tộc Việt. Ông kết duyên với Âu Cơ, sinh bọc trăm trứng; 50 người con theo cha xuống biển, 50 người con theo mẹ lên núi.",
    "au co": "Âu Cơ là tiên nữ trong truyền thuyết Con Rồng Cháu Tiên. Bà cùng Lạc Long Quân sinh ra bọc trăm trứng, biểu tượng cho nguồn gốc chung và tinh thần đoàn kết của người Việt.",
    "hung vuong": "Các vua Hùng gắn với thời Văn Lang, truyền thuyết dựng nước và nhiều câu chuyện như bánh chưng bánh dày, Sơn Tinh Thủy Tinh, Thánh Gióng.",
    "son tinh": "Sơn Tinh Thủy Tinh giải thích hiện tượng lũ lụt và khát vọng trị thủy của cư dân nông nghiệp.",
    "thanh giong": "Thánh Gióng là biểu tượng chống ngoại xâm trong truyền thuyết Việt Nam. Hình tượng cậu bé vươn vai thành tráng sĩ nhấn mạnh sức mạnh cộng đồng khi đất nước lâm nguy.",
    "bach dang": "Bạch Đằng năm 938 do Ngô Quyền chỉ huy là chiến thắng chấm dứt hơn một nghìn năm Bắc thuộc, nổi bật với chiến thuật cọc gỗ kết hợp thủy triều.",
    "hai ba trung": "Hai Bà Trưng khởi nghĩa năm 40 SCN chống ách đô hộ Đông Hán, là biểu tượng tiêu biểu về tinh thần độc lập và vai trò phụ nữ trong lịch sử Việt Nam.",
    "tran hung dao": "Trần Hưng Đạo là danh tướng thời Trần, chỉ huy kháng chiến chống Nguyên Mông. Ông gắn với Hịch tướng sĩ và chiến thắng Bạch Đằng năm 1288.",
    "le loi": "Lê Lợi lãnh đạo khởi nghĩa Lam Sơn chống quân Minh, giành thắng lợi và lập nhà Lê sơ năm 1428. Nguyễn Trãi thay ông viết Bình Ngô đại cáo.",
}


def _normalize_chat_text(text: str) -> str:
    text = unicodedata.normalize("NFD", text.lower())
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    text = text.replace("đ", "d")
    return re.sub(r"[^a-z0-9\s]", " ", text)


def matched_history_reply(message: str) -> str | None:
    normalized = _normalize_chat_text(message)
    for key, answer in CHAT_FALLBACKS.items():
        if key in normalized:
            return answer
    return None


def local_history_reply(message: str) -> str:
    matched = matched_history_reply(message)
    if matched:
        return matched
    normalized = _normalize_chat_text(message)
    if any(token in normalized for token in ("lich su", "viet nam", "truyen thuyet", "van hoa", "chien tran", "trieu dai", "huyen thoai")):
        return (
            "Mình có thể hỗ trợ các chủ đề lịch sử Việt Nam như Huyền Thoại, Chiến Trận và Triều Đại. "
            "Bạn có thể hỏi về Lạc Long Quân, Âu Cơ, vua Hùng, Bạch Đằng, Hai Bà Trưng, Trần Hưng Đạo hoặc Lê Lợi."
        )
    return (
        "Mình là trợ lý lịch sử Việt Nam, nên chỉ trả lời các câu hỏi liên quan đến lịch sử, văn hóa và truyền thuyết Việt Nam. "
        "Bạn hãy thử hỏi về một nhân vật, sự kiện hoặc triều đại Việt Nam."
    )

@app.post("/api/chat", tags=["AI Chat"], summary="Chat với AI lịch sử")
@limiter.limit(CHAT_RATE_LIMIT)
async def ai_chat(req: ChatRequest, request: Request):
    import asyncio
    user_msg = req.message.strip()
    if not user_msg or len(user_msg) > 500:
        raise HTTPException(400, "Tin nhắn không hợp lệ")
    local_match = matched_history_reply(user_msg)
    if local_match:
        return {"reply": local_match, "source": "local_fallback"}
    if not GEMINI_KEY:
        return {"reply": local_history_reply(user_msg), "source": "local_fallback"}

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
    deadline = time.monotonic() + AI_TOTAL_TIMEOUT_SECONDS
    async with httpx.AsyncClient() as client:
        for model in GEMINI_MODELS:
            if time.monotonic() >= deadline:
                last_error = "overall timeout"
                break
            url = f"{GEMINI_BASE}/{model}:generateContent?key={GEMINI_KEY}"
            is_gemma = model.startswith("gemma")
            payload = payload_no_sys if is_gemma else payload_with_sys
            for attempt in range(1):
                try:
                    remaining = max(0.5, min(AI_HTTP_TIMEOUT_SECONDS, deadline - time.monotonic()))
                    resp = await client.post(url, json=payload, timeout=remaining)
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["candidates"][0]["content"]["parts"][0]["text"]
                        return {"reply": text}
                    last_error = f"{model}: HTTP {resp.status_code}"
                    break
                except Exception as e:
                    last_error = f"{model}: {type(e).__name__}"

    REQUEST_LOGGER.warning("[AI] Gemini unavailable, using local fallback: %s", last_error)
    return {"reply": local_history_reply(user_msg), "source": "local_fallback"}


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
if os.path.isdir(static_dir):
    app.mount("/static", SafeStaticFiles(directory=static_dir), name="static")


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
    """SPA catch-all: serve index.html for any unknown frontend path."""
    if full_path.startswith("api/") or full_path == "api":
        from fastapi.responses import JSONResponse
        return JSONResponse({"detail": "Not Found"}, status_code=404)
    if full_path.startswith("static/"):
        from fastapi.responses import JSONResponse
        return JSONResponse({"detail": "Not Found"}, status_code=404)
    import os as _os
    _idx = _os.path.join(_os.path.dirname(__file__), "static", "index.html")
    if _os.path.isfile(_idx):
        return FileResponse(
            _idx, media_type="text/html",
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
