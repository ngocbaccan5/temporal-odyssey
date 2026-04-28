"""
Temporal Odyssey — Database Models (SQLAlchemy + SQLite/PostgreSQL)
"""
import os
from sqlalchemy import (
    create_engine, Column, Integer, String, Boolean,
    DateTime, Text, ForeignKey, UniqueConstraint
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./temporal_odyssey.db")
ENV = os.getenv("ENV", "development").strip().lower()

# Railway/Render cấp URL dạng postgres:// — SQLAlchemy cần postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

_is_sqlite = DATABASE_URL.startswith("sqlite")
if ENV == "production" and _is_sqlite:
    raise RuntimeError("Production must use PostgreSQL via DATABASE_URL, not SQLite.")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if _is_sqlite else {},
    pool_pre_ping=True,
    pool_size=5 if _is_sqlite else 10,
    max_overflow=10 if _is_sqlite else 20
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(128), nullable=False)
    xp = Column(Integer, default=120, nullable=False)
    free_left = Column(Integer, default=5, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    journal_entries = relationship(
        "JournalEntry", back_populates="user",
        cascade="all, delete-orphan", lazy="dynamic"
    )
    played_counts = relationship(
        "PlayedCount", back_populates="user",
        cascade="all, delete-orphan", lazy="joined"
    )


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    entry_type = Column(String(30), default="experience")
    title = Column(String(200), default="")
    details = Column(Text, default="")
    category = Column(String(30), default="")
    year = Column(String(50), default="")
    event_id = Column(String(50), default="")
    xp_delta = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="journal_entries")


class PlayedCount(Base):
    __tablename__ = "played_counts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    category = Column(String(30), nullable=False)
    count = Column(Integer, default=0, nullable=False)

    user = relationship("User", back_populates="played_counts")

    __table_args__ = (
        UniqueConstraint("user_id", "category", name="uq_user_category"),
    )


class QuizAttempt(Base):
    """Track which questions a user has seen, to avoid repeats."""
    __tablename__ = "quiz_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    event_id = Column(String(50), nullable=False, index=True)
    question_ids = Column(Text, default="")  # comma-separated question IDs used
    score = Column(Integer, default=0)  # correct answers count
    total = Column(Integer, default=3)
    passed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")


def init_db():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
