"""
Temporal Odyssey — Authentication Utilities (JWT + bcrypt)
"""
import os
import secrets
from datetime import datetime, timedelta

import bcrypt
from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import get_db, User

ENV = os.getenv("ENV", "development").strip().lower()
IS_PRODUCTION = ENV == "production"

_SECRET_KEY = os.getenv("SECRET_KEY", "").strip()
_WEAK_SECRET_MARKERS = ("changeme", "change-this", "your-", "placeholder", "secret-key")
if IS_PRODUCTION and (
    len(_SECRET_KEY) < 32 or any(marker in _SECRET_KEY.lower() for marker in _WEAK_SECRET_MARKERS)
):
    raise RuntimeError("SECRET_KEY must be set to a strong random value in production.")

SECRET_KEY = _SECRET_KEY or secrets.token_hex(32)
ALGORITHM = "HS256"

try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("TOKEN_EXPIRE_MINUTES", "1440"))
except ValueError:
    if IS_PRODUCTION:
        raise RuntimeError("TOKEN_EXPIRE_MINUTES must be an integer in production.")
    ACCESS_TOKEN_EXPIRE_MINUTES = 1440
ACCESS_TOKEN_EXPIRE_MINUTES = max(5, min(ACCESS_TOKEN_EXPIRE_MINUTES, 10080))

security = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_token(user_id: int, username: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "username": username, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Token không hợp lệ hoặc đã hết hạn")


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    if not credentials:
        raise HTTPException(status_code=401, detail="Chưa đăng nhập")
    payload = decode_token(credentials.credentials)
    try:
        user_id = int(payload.get("sub"))
    except (ValueError, TypeError):
        raise HTTPException(status_code=401, detail="Token không hợp lệ")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="Tài khoản không tồn tại")
    return user


def get_optional_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """Returns User if valid token exists, None otherwise. Never raises 401."""
    if not credentials:
        return None
    try:
        payload = decode_token(credentials.credentials)
        user_id = int(payload.get("sub"))
        return db.query(User).filter(User.id == user_id).first()
    except Exception:
        return None


def get_optional_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User | None:
    if not credentials:
        return None
    try:
        payload = decode_token(credentials.credentials)
        user_id = int(payload.get("sub"))
        return db.query(User).filter(User.id == user_id).first()
    except Exception:
        return None
