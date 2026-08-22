from datetime import date, datetime

from pydantic import BaseModel, Field


class AttendanceBase(BaseModel):
    attendance_date: date
    status: str = "present"
    notes: str | None = None


class AttendanceCheckIn(BaseModel):
    notes: str | None = None


class AttendanceCheckOut(BaseModel):
    notes: str | None = None


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    attendance_date: date
    check_in: datetime | None = None
    check_out: datetime | None = None
    status: str
    notes: str | None = None

    class Config:
        from_attributes = True


class AttendanceSummary(BaseModel):
    total_days: int
    present: int
    absent: int
    half_day: int
    leave: int
    employee_id: int
    month: str
