from datetime import date

from sqlalchemy.orm import Session

from app.models.leave_request import LeaveRequest, LeaveStatus, LeaveType


def get_employee_leave_requests(db: Session, employee_id: int):
    return (
        db.query(LeaveRequest)
        .filter(LeaveRequest.employee_id == employee_id)
        .order_by(LeaveRequest.start_date.desc())
        .all()
    )


def get_all_leave_requests(db: Session):
    return db.query(LeaveRequest).order_by(LeaveRequest.start_date.desc()).all()


def apply_leave(db: Session, employee_id: int, leave_type: str, start_date: date, end_date: date, reason: str | None = None):
    if end_date < start_date:
        raise ValueError("End date cannot be before start date")

    total_days = (end_date - start_date).days + 1
    leave = LeaveRequest(
        employee_id=employee_id,
        leave_type=LeaveType(leave_type.lower()),
        start_date=start_date,
        end_date=end_date,
        total_days=total_days,
        reason=reason,
        status=LeaveStatus.PENDING,
    )
    db.add(leave)
    db.commit()
    db.refresh(leave)
    return leave


def update_leave_status(db: Session, leave_request: LeaveRequest, status: str, comments: str | None = None):
    if status not in [LeaveStatus.APPROVED.value, LeaveStatus.REJECTED.value]:
        raise ValueError("Status must be approved or rejected")

    leave_request.status = LeaveStatus(status.lower())
    leave_request.comments = comments
    db.commit()
    db.refresh(leave_request)
    return leave_request
