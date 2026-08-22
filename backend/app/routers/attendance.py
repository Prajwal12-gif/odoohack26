from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.permissions import require_employee, require_hr
from app.database import get_db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.models.user import User
from app.schemas.attendance import AttendanceCheckIn, AttendanceCheckOut, AttendanceResponse, AttendanceSummary
from app.services.attendance_service import check_in_today, check_out_today, get_attendance_summary, get_employee_attendance, get_team_attendance

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/check-in", response_model=AttendanceResponse)
def employee_check_in(
    payload: AttendanceCheckIn | None = None,
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found")

    try:
        record = check_in_today(db, employee)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if payload and payload.notes:
        record.notes = payload.notes
        db.commit()
        db.refresh(record)
    return record


@router.post("/check-out", response_model=AttendanceResponse)
def employee_check_out(
    payload: AttendanceCheckOut | None = None,
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found")

    try:
        record = check_out_today(db, employee)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if payload and payload.notes:
        record.notes = payload.notes
        db.commit()
        db.refresh(record)
    return record


@router.get("/me", response_model=list[AttendanceResponse])
def my_attendance(
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found")
    return get_employee_attendance(db, employee.id)


@router.get("/summary", response_model=AttendanceSummary)
def my_attendance_summary(
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found")
    summary = get_attendance_summary(db, employee.id)
    return AttendanceSummary(
        total_days=summary["total_days"],
        present=summary["present"],
        absent=summary["absent"],
        half_day=summary["half_day"],
        leave=summary["leave"],
        employee_id=employee.id,
        month=summary["month"],
    )


@router.get("/all", response_model=list[AttendanceResponse])
def all_attendance(
    _: User = Depends(require_hr),
    db: Session = Depends(get_db),
):
    return get_team_attendance(db)
