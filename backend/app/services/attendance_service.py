from datetime import date, datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.attendance import Attendance, AttendanceStatus
from app.models.employee import Employee


def get_employee_attendance(db: Session, employee_id: int, target_date: date | None = None):
    query = db.query(Attendance).filter(Attendance.employee_id == employee_id)
    if target_date:
        query = query.filter(Attendance.attendance_date == target_date)
    return query.order_by(Attendance.attendance_date.desc()).all()


def get_team_attendance(db: Session):
    return (
        db.query(Attendance)
        .join(Employee)
        .order_by(Attendance.attendance_date.desc(), Attendance.id.desc())
        .all()
    )


def check_in_today(db: Session, employee: Employee):
    today = date.today()
    existing = (
        db.query(Attendance)
        .filter(Attendance.employee_id == employee.id)
        .filter(Attendance.attendance_date == today)
        .first()
    )

    if existing:
        if existing.check_in:
            raise ValueError("Already checked in today")
        existing.check_in = datetime.utcnow()
        if existing.status == AttendanceStatus.ABSENT:
            existing.status = AttendanceStatus.PRESENT
        db.commit()
        db.refresh(existing)
        return existing

    record = Attendance(
        employee_id=employee.id,
        attendance_date=today,
        check_in=datetime.utcnow(),
        status=AttendanceStatus.PRESENT,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def check_out_today(db: Session, employee: Employee):
    today = date.today()
    existing = (
        db.query(Attendance)
        .filter(Attendance.employee_id == employee.id)
        .filter(Attendance.attendance_date == today)
        .first()
    )

    if not existing:
        raise ValueError("No check-in found for today")
    if existing.check_out:
        raise ValueError("Already checked out today")

    existing.check_out = datetime.utcnow()
    db.commit()
    db.refresh(existing)
    return existing


def get_attendance_summary(db: Session, employee_id: int, month: str | None = None):
    summary = {
        "total_days": 0,
        "present": 0,
        "absent": 0,
        "half_day": 0,
        "leave": 0,
    }
    records = get_employee_attendance(db, employee_id)
    for record in records:
        summary["total_days"] += 1
        if record.status == AttendanceStatus.PRESENT:
            summary["present"] += 1
        elif record.status == AttendanceStatus.ABSENT:
            summary["absent"] += 1
        elif record.status == AttendanceStatus.HALF_DAY:
            summary["half_day"] += 1
        elif record.status == AttendanceStatus.LEAVE:
            summary["leave"] += 1
    return {
        "employee_id": employee_id,
        "month": month or "all",
        **summary,
    }
