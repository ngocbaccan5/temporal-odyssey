"""
Generate quiz bank for Temporal Odyssey using Gemini AI.
Creates 100+ questions per event, targeting 5000+ total questions.
"""
import httpx
import json
import os
import time
import sys
from dotenv import load_dotenv

load_dotenv()
GEMINI_KEY = os.getenv("GEMINI_API_KEY", "")
MODEL = "gemini-2.5-flash"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={GEMINI_KEY}"

# All events with titles and context for question generation
EVENTS = {
    # MYTH
    "laclong": "Lạc Long Quân & Âu Cơ - truyền thuyết sáng thế, bọc trăm trứng, nguồn gốc dân tộc Việt, 50 con xuống biển 50 con lên núi",
    "autien": "Sự Tích Bánh Chưng Bánh Dày - Lang Liêu, Hùng Vương VI, lễ vật Tết, truyền ngôi, ý nghĩa đất trời",
    "sontinhts": "Sơn Tinh Thủy Tinh - Hùng Vương XVIII, Mị Nương, Thần Núi vs Thần Nước, giải thích lũ lụt",
    "andvuong": "An Dương Vương & Nỏ Thần - thành Cổ Loa, nỏ thần Kim Quy, Triệu Đà, 257 TCN, nước Âu Lạc",
    "m_trongthu": "Trọng Thủy & Mị Châu - bi kịch tình yêu, đánh cắp lẫy nỏ, lông ngỗng, 179 TCN, Cổ Loa thất thủ",
    "m_chunong": "Chử Đồng Tử & Tiên Dung - Tứ Bất Tử, chàng trai nghèo, công chúa Tiên Dung, sông Hồng, hóa tiên",
    "m_hungvuong": "18 Đời Vua Hùng - nhà nước Văn Lang, 2879-258 TCN, kinh đô Phong Châu, trống đồng Đông Sơn, nền văn minh lúa nước",
    "m_giongphu": "Thánh Gióng Phù Đổng - Tứ Bất Tử, Hùng Vương VI, giặc Ân, ngựa sắt, cậu bé 3 tuổi, bay về trời",
    "m_cholua": "Chú Cuội Cung Trăng - cây thuốc thần, vợ Cuội, bay lên mặt trăng, gốc đa, giải thích bóng trên trăng",
    "m_maiden": "Công Chúa Liễu Hạnh - Tứ Bất Tử, con gái Ngọc Hoàng, Mẫu Liễu Hạnh, tín ngưỡng thờ Mẫu, thế kỷ XVI",
    "m_trungquoc": "Rồng Tiên - Nguồn Gốc Dân Tộc - con Rồng cháu Tiên, Lạc Long Quân, Âu Cơ, bản sắc dân tộc Việt",
    "m_phongtho": "Thần Núi & Thần Biển - Sơn Tinh/Thủy Tinh, tín ngưỡng tự nhiên, đấu tranh đất nước",
    "m_coloa": "Thành Cổ Loa Hình Ốc - An Dương Vương xây thành, 3 vòng xoáy, kiến trúc quân sự cổ, 257 TCN, Đông Anh",
    "m_nothanbao": "Nỏ Thần Kim Quy - Thần Rùa trao vuốt thần, vũ khí bí mật Âu Lạc, bảo vệ đất nước",
    "m_mychau": "Dấu Lông Ngỗng Của Mị Châu - Mị Châu rắc lông ngỗng, dẫn đường cho giặc, bi kịch lịch sử",
    "m_tuongda": "Triệu Đà & Âu Lạc - tướng nhà Tần, lập Nam Việt, thôn tính Âu Lạc 207 TCN, kế hôn nhân",
    "m_rua": "Huyền Thoại Rùa Vàng - Kim Quy giúp An Dương Vương, Lê Lợi nhận gươm, Hồ Hoàn Kiếm, linh vật Việt Nam",
    "m_than": "Thần Thánh Trong Dân Gian - Thổ Công, Táo Quân, Thần Tài, 23 tháng Chạp, cá chép, tín ngưỡng Việt",
    "m_ongdong": "Trống Đồng Đông Sơn - văn minh Đông Sơn, 500 TCN-100 SCN, nhạc cụ nghi lễ, hoa văn, quyền lực",
    "m_bachu": "Bà Chúa Xứ Núi Sam - nữ thần Châu Đốc An Giang, tượng bà, lễ hội lớn nhất Việt Nam",
    "m_phucuc": "Thần Biển & Ngư Dân - Cá Ông (Cá Voi), tín ngưỡng duyên hải, tang lễ cá voi, ngư dân Việt Nam",
    "m_tiensau": "Nàng Tiên & Chàng Tiều Phu - cổ tích ba điều ước, đạo đức, lòng nhân hậu, vị tha",
    "m_dragonking": "Long Vương & Biển Đông - cung điện dưới biển, tín ngưỡng thần biển, ngư dân cúng lễ",
    "m_jade": "Ngọc Hoàng Thượng Đế - thiên đình, Táo Quân báo cáo, 23 tháng Chạp, tín ngưỡng dân gian",
    "m_tamcam": "Tấm Cám - cổ tích nổi tiếng nhất, mẹ kế, Bụt, chim Vàng Anh, quả thị, hóa thân nhiều lần",
    "m_thachsamh": "Thạch Sanh Chém Xà Tinh - con Ngọc Hoàng đầu thai, Lý Thông, xà tinh, đàn thần, cứu công chúa",
    "m_camrong": "Cậu Bé Rồng - dấu hiệu rồng, số phận phi thường, tín ngưỡng dân gian",
    "m_trongsong": "Truyền Thuyết Trống Sấm - tiếng sấm thần, tín ngưỡng nông nghiệp, quan sát tự nhiên",
    "m_honvong": "Hòn Vọng Phu - người vợ chờ chồng hóa đá, lòng chung thủy, nhiều phiên bản ở Việt Nam",
    "m_cheoleo": "Nghệ Thuật Chèo Cổ - nghệ thuật dân gian thế kỷ X, ca múa nhạc kịch, Thị Mầu, di sản văn hóa phi vật thể",

    # BATTLE
    "bachang": "Trận Bạch Đằng 938 - Ngô Quyền, cọc gỗ bọc sắt, thủy triều, Nam Hán, chấm dứt Bắc thuộc 1000 năm",
    "haiba": "Khởi Nghĩa Hai Bà Trưng 40 SCN - Trưng Trắc Trưng Nhị, 65 thành trì, Thi Sách, Mê Linh, nữ tướng",
    "dinhtien": "Đinh Bộ Lĩnh Dẹp 12 Sứ Quân 968 - thống nhất đất nước, Đại Cồ Việt, kinh đô Hoa Lư, Ninh Bình",
    "b_trungvu": "Cuộc Khởi Nghĩa Trưng Vương 40-43 SCN - Thi Sách, Mê Linh, nữ tướng, 3 năm cầm quyền",
    "b_trieuhoa": "Bà Triệu Khởi Nghĩa 248 SCN - Triệu Thị Trinh, 19 tuổi, chống nhà Ngô, cưỡi gió mạnh đạp sóng dữ",
    "b_lynam": "Lý Bí Lập Nước Vạn Xuân 544 SCN - khởi nghĩa 542, đánh quân Lương, kinh đô Long Biên",
    "b_khuchua": "Khúc Thừa Dụ Tự Lập 905 - nhân loạn nhà Đường, Tiết độ sứ, mở đầu thời kỳ tự chủ",
    "b_ledai": "Lê Đại Hành Chống Tống 981 - Lê Hoàn, trận Chi Lăng Bạch Đằng, nhà Tiền Lê, đánh bại nhà Tống",
    "b_ngoquyen2": "Ngô Quyền & Chiến Lược Thủy Chiến 938 - cọc gỗ bọc sắt, thủy triều, dụ địch, bãi cọc, thiên tài quân sự",
    "b_lythuong": "Lý Thường Kiệt & Phòng Tuyến Sông Như Nguyệt 1077 - Nam quốc sơn hà, 30 vạn quân Tống, tuyên ngôn độc lập",
    "b_trandao": "Trận Đông Bộ Đầu 1258 - Trần Thái Tông, Mông Cổ lần 1, vườn không nhà trống, phản công",
    "b_hatitran": "Hội Nghị Diên Hồng 1284 - bô lão, hòa hay chiến, đoàn kết toàn dân, nhà Trần chống Nguyên lần 2",
    "b_chilang": "Trận Chi Lăng Xương Giang 1427 - Lê Lợi, Liễu Thăng tử trận, 10 vạn viện binh Minh, Lạng Sơn",
    "b_lamson": "Khởi Nghĩa Lam Sơn 1418-1427 - Lê Lợi, Thanh Hóa, Nguyễn Trãi, Bình Ngô Đại Cáo, chống Minh",

    # DYNASTY
    "dinh968": "Nhà Đinh - Đại Cồ Việt 968-980 - Đinh Tiên Hoàng, nhà nước phong kiến đầu tiên, Hoa Lư",
    "ly1009": "Nhà Lý - Thăng Long 1009-1225 - Lý Công Uẩn, dời đô, Lý Thường Kiệt đánh Tống 1076",
    "tran1226": "Nhà Trần - Ba Lần Kháng Nguyên 1225-1400 - 1258 1285 1288, vườn không nhà trống, Trần Hưng Đạo",
    "le1428": "Nhà Lê - Bình Ngô Đại Cáo 1428-1788 - Lê Lợi, Nguyễn Trãi, khởi nghĩa Lam Sơn, chống Minh",
    "d_tienle": "Nhà Tiền Lê 980-1009 - Lê Hoàn, đánh Tống 981, Văn Lang Âu Lạc Bắc thuộc thứ tự",
    "d_macmac": "Nhà Mạc & Nam Bắc Triều 1527-1592 - Mạc Đăng Dung, Lê Trung Hưng, phân tranh",
    "d_tayon": "Tây Sơn & Nguyễn Huệ 1771-1802 - 3 anh em, Quang Trung, đại phá quân Thanh 1789 trong 5 ngày",
    "d_nguyen": "Nhà Nguyễn Triều Đại Cuối 1802-1945 - Gia Long, Pháp xâm lược 1858, Bảo Đại thoái vị 1945",
    "d_phapthuan": "Pháp Thuộc & Phong Trào Yêu Nước 1858-1945 - Cần Vương, Đông Du, Phan Bội Châu, Cách mạng Tháng Tám",
    "d_cachtang": "Độc Lập 1945 & Chiến Tranh 1945-1975 - Hồ Chí Minh, Điện Biên Phủ, thống nhất 30/4/1975",
}

SYSTEM_PROMPT = """Bạn là chuyên gia lịch sử Việt Nam. Hãy tạo câu hỏi trắc nghiệm chất lượng cao.

YÊU CẦU:
- Mỗi câu hỏi có đúng 4 đáp án (A, B, C, D)
- Chỉ có 1 đáp án đúng
- Câu hỏi phải chính xác về mặt lịch sử
- Đáp án sai phải hợp lý (không quá dễ loại trừ)
- Câu hỏi đa dạng: năm, nhân vật, sự kiện, nguyên nhân, ý nghĩa, địa danh, kết quả
- Độ khó đa dạng: dễ, trung bình, khó
- Viết bằng tiếng Việt, ngắn gọn, rõ ràng

OUTPUT FORMAT (JSON array, KHÔNG có markdown):
[
  {
    "id": 1,
    "q": "Câu hỏi?",
    "opts": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    "ans": 0,
    "difficulty": "easy"
  }
]

Trong đó "ans" là index (0-3) của đáp án đúng.
"difficulty" là "easy", "medium", hoặc "hard".
"""


def generate_questions(event_id, context, count=20):
    """Generate questions for one event."""
    prompt = f"""Tạo {count} câu hỏi trắc nghiệm về: {context}

Chủ đề event: {event_id}
Số lượng: {count} câu
Đa dạng độ khó: ~30% dễ, ~50% trung bình, ~20% khó.

Trả về JSON array thuần túy, KHÔNG có markdown code fence."""

    payload = {
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.8,
            "maxOutputTokens": 16000,
            "responseMimeType": "application/json",
        },
    }

    for attempt in range(3):
        try:
            r = httpx.post(URL, json=payload, timeout=120)
            if r.status_code == 200:
                data = r.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                # Parse JSON
                questions = json.loads(text)
                if isinstance(questions, list) and len(questions) > 0:
                    return questions
                print(f"  WARNING: Got {type(questions)} instead of list")
            elif r.status_code == 503:
                print(f"  503 overloaded, retry {attempt+1}...")
                time.sleep(5 + attempt * 5)
                continue
            else:
                print(f"  HTTP {r.status_code}: {r.text[:200]}")
                if r.status_code == 429:
                    print(f"  Rate limited, waiting 30s...")
                    time.sleep(30)
                    continue
        except json.JSONDecodeError as e:
            print(f"  JSON parse error: {e}")
            # Try to extract JSON from text
            try:
                import re
                match = re.search(r'\[.*\]', text, re.DOTALL)
                if match:
                    questions = json.loads(match.group())
                    return questions
            except:
                pass
        except Exception as e:
            print(f"  Error: {e}")
            time.sleep(2)
    return []


def main():
    if not GEMINI_KEY:
        print("ERROR: Set GEMINI_API_KEY in .env")
        sys.exit(1)

    # Load existing bank if any
    bank_path = os.path.join("static", "quiz_bank.json")
    if os.path.exists(bank_path):
        with open(bank_path, "r", encoding="utf-8") as f:
            bank = json.load(f)
        print(f"Loaded existing bank: {sum(len(v) for v in bank.values())} questions across {len(bank)} events")
    else:
        bank = {}

    total_generated = sum(len(v) for v in bank.values())
    events_done = 0
    events_total = len(EVENTS)

    for event_id, context in EVENTS.items():
        events_done += 1

        # Skip if already has enough questions
        if event_id in bank and len(bank[event_id]) >= 15:
            print(f"[{events_done}/{events_total}] {event_id}: SKIP ({len(bank[event_id])} questions)")
            continue

        print(f"[{events_done}/{events_total}] {event_id}: Generating...")
        questions = generate_questions(event_id, context, count=20)

        if questions:
            # Add unique IDs within event
            for i, q in enumerate(questions):
                q["id"] = i + 1
                q["event_id"] = event_id

            bank[event_id] = questions
            total_generated = sum(len(v) for v in bank.values())
            print(f"  Generated {len(questions)} questions. Total: {total_generated}")

            # Save after each event (safety)
            with open(bank_path, "w", encoding="utf-8") as f:
                json.dump(bank, f, ensure_ascii=False, indent=1)
        else:
            print(f"  FAILED to generate questions for {event_id}")

        # Rate limiting - respect API quotas
        time.sleep(4)

    total = sum(len(v) for v in bank.values())
    print(f"\n{'='*50}")
    print(f"DONE! Total: {total} questions across {len(bank)} events")
    print(f"Saved to: {bank_path}")


if __name__ == "__main__":
    main()
