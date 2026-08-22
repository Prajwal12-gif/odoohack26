from datetime import date

from sqlalchemy import Date, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    # Personal Information
    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    last_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    phone: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    date_of_birth: Mapped[date | None] = mapped_column(
        Date,
        nullable=True
    )

    address: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    profile_picture: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    # Job Information
    department: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    designation: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    joining_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True
    )

    employment_status: Mapped[str] = mapped_column(
        String(30),
        default="active",
        nullable=False
    )

    # Emergency Contact
    emergency_contact_name: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    emergency_contact_phone: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    # User relationship
    user: Mapped["User"] = relationship(
        "User",
        back_populates="employee"
    )