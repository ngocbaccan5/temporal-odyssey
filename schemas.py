"""
Temporal Odyssey — Pydantic Schemas (Request / Response models)
"""
import re
from pydantic import BaseModel, field_validator
from typing import Optional


class UserRegister(BaseModel):
    username: str
    password: str

    @field_validator("username")
    @classmethod
    def val_username(cls, v):
        v = v.strip()
        if len(v) < 3 or len(v) > 30:
            raise ValueError("Tên đăng nhập từ 3–30 ký tự")
        if re.search(r"\s", v):
            raise ValueError("Tên đăng nhập không được có khoảng trắng")
        if not re.match(r"^[a-zA-Z0-9_]+$", v):
            raise ValueError("Tên đăng nhập chỉ chứa chữ, số và _")
        return v

    @field_validator("password")
    @classmethod
    def val_password(cls, v):
        if len(v) < 6:
            raise ValueError("Mật khẩu tối thiểu 6 ký tự")
        if len(v) > 72:
            raise ValueError("Mật khẩu tối đa 72 ký tự")
        return v


class UserLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    xp: int
    free_left: int


class ProfileResponse(BaseModel):
    username: str
    xp: int
    free_left: int
    is_admin: bool
    played: dict = {}
    journal: list = []


class ProfileUpdate(BaseModel):
    xp: Optional[int] = None
    free_left: Optional[int] = None


class XPAward(BaseModel):
    amount: int
    event_id: str = ""
    entry_type: str = "experience"
    title: str = ""
    details: str = ""
    category: str = ""
    year: str = ""

    @field_validator("amount")
    @classmethod
    def val_amount(cls, v):
        if v < 0 or v > 500:
            raise ValueError("Số XP không hợp lệ")
        return v


class XPRedeem(BaseModel):
    cost: int

    @field_validator("cost")
    @classmethod
    def val_cost(cls, v):
        if v not in (50, 100, 200):
            raise ValueError("Gói XP không hợp lệ")
        return v


class PlayedUpdate(BaseModel):
    category: str

    @field_validator("category")
    @classmethod
    def val_cat(cls, v):
        if v not in ("myth", "battle", "dynasty"):
            raise ValueError("Category không hợp lệ")
        return v


class JournalEntryCreate(BaseModel):
    entry_type: str = "experience"
    title: str = "Trải nghiệm lịch sử"
    details: str = ""
    category: str = ""
    year: str = ""
    event_id: str = ""
    xp_delta: int = 0


class AdminVerify(BaseModel):
    password: str


class ChatRequest(BaseModel):
    message: str

    @field_validator("message")
    @classmethod
    def val_message(cls, v):
        v = v.strip()
        if len(v) > 500:
            raise ValueError("Tin nhắn tối đa 500 ký tự")
        return v


class QuizRequest(BaseModel):
    event_id: str

    @field_validator("event_id")
    @classmethod
    def val_event(cls, v):
        v = v.strip()
        if not v or len(v) > 50:
            raise ValueError("Event ID không hợp lệ")
        return v


class QuizAnswer(BaseModel):
    event_id: str
    answers: list  # list of {question_id: int, selected: int}

    @field_validator("answers")
    @classmethod
    def val_answers(cls, v):
        if not v or len(v) < 1 or len(v) > 10:
            raise ValueError("Số câu trả lời không hợp lệ")
        return v
