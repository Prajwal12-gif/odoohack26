from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.permissions import require_employee, require_hr
from app.database import get_db
from app.models.employee import Employee
from app.models.leave_request import LeaveRequest
from app.models.user import User
from app.schemas.leave_request import LeaveRequestCreate, LeaveRequestDecision, LeaveRequestResponse
from app.services.leave_service import apply_leave, get_all_leave_requests, get_employee_leave_requests, update_leave_status

router = APIRouter(prefix="/leave", tags=["Leave Management"])


@router.post("/apply", response_model=LeaveRequestResponse, status_code=status.HTTP_201_CREATED)
def create_leave_request(
    payload: LeaveRequestCreate,
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found")

    try:
        leave = apply_leave(
            db,
            employee.id,
            payload.leave_type,
            payload.start_date,
            payload.end_date,
            payload.reason,
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return leave


@router.get("/me", response_model=list[LeaveRequestResponse])
def my_leave_requests(
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found")
    return get_employee_leave_requests(db, employee.id)


@router.get("/all", response_model=list[LeaveRequestResponse])
def all_leave_requests(
    _: User = Depends(require_hr),
    db: Session = Depends(get_db),
):
    return get_all_leave_requests(db)


@router.put("/{leave_id}/decision", response_model=LeaveRequestResponse)
def decide_leave_request(
    leave_id: int,
    payload: LeaveRequestDecision,
    _: User = Depends(require_hr),
    db: Session = Depends(get_db),
):
    leave = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
    if not leave:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leave request not found")

    try:
        leave = update_leave_status(db, leave, payload.status, payload.comments)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return leave
