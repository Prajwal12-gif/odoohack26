from enum import Enum

from sqlalchemy import Boolean, DateTime, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime
from sqlalchemy import Boolean, DateTime, String

from app.database import Base


class UserRole(str, Enum):
    EMPLOYEE = "employee"
    ADMIN = "admin"
    HR_OFFICER = "hr_officer"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    employee_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[UserRole] = mapped_column(
        nullable=False,
        default=UserRole.EMPLOYEE
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )
    otp_code: Mapped[str | None] = mapped_column(
    String(6),
    nullable=True
    )

    otp_expires_at: Mapped[datetime | None] = mapped_column(
    DateTime(timezone=True),
    nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    employee: Mapped["Employee"] = relationship(
        "Employee",
        back_populates="user",
        uselist=False
    )