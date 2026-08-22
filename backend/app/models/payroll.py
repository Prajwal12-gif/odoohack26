from datetime import date, datetime
from enum import Enum

from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PayrollStatus(str, Enum):
    DRAFT = "draft"
    APPROVED = "approved"


class Payroll(Base):
    __tablename__ = "payrolls"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    employee_id: Mapped[int] = mapped_column(
        ForeignKey("employees.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    salary_month: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    basic_salary: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False, default=0)
    allowances: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False, default=0)
    deductions: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False, default=0)
    net_salary: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False, default=0)
    status: Mapped[PayrollStatus] = mapped_column(
        String(20),
        default=PayrollStatus.DRAFT,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    employee: Mapped["Employee"] = relationship("Employee", back_populates="payroll_entries")
