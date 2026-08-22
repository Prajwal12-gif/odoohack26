from datetime import date

from pydantic import BaseModel


class LeaveRequestCreate(BaseModel):
    leave_type: str
    start_date: date
    end_date: date
    reason: str | None = None


class LeaveRequestDecision(BaseModel):
    status: str
    comments: str | None = None


class LeaveRequestResponse(BaseModel):
    id: int
    employee_id: int
    leave_type: str
    start_date: date
    end_date: date
    total_days: int
    reason: str | None = None
    status: str
    comments: str | None = None

    class Config:
        from_attributes = True
