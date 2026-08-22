from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.permissions import require_admin, require_hr
from app.database import get_db
from app.models.employee import Employee
from app.models.leave_request import LeaveRequest
from app.models.user import User, UserRole
from app.schemas.user import UserResponse

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/dashboard")
def admin_dashboard(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    employee_count = db.query(Employee).count()
    user_count = db.query(User).count()
    pending_leaves = db.query(LeaveRequest).filter(LeaveRequest.status == "pending").count()
    return {
        "employee_count": employee_count,
        "user_count": user_count,
        "pending_leave_requests": pending_leaves,
    }


@router.get("/users", response_model=list[UserResponse])
def list_users(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return db.query(User).order_by(User.id.asc()).all()


@router.get("/employees", response_model=list[dict])
def list_employees(
    _: User = Depends(require_hr),
    db: Session = Depends(get_db),
):
    employees = db.query(Employee).order_by(Employee.id.asc()).all()
    data = []
    for employee in employees:
        user = db.query(User).filter(User.id == employee.user_id).first()
        data.append({
            "id": employee.id,
            "employee_id": user.employee_id if user else None,
            "first_name": employee.first_name,
            "last_name": employee.last_name,
            "department": employee.department,
            "designation": employee.designation,
            "employment_status": employee.employment_status,
            "email": user.email if user else None,
            "role": user.role.value if user else None,
        })
    return data


@router.put("/users/{user_id}/role")
def update_user_role(
    user_id: int,
    role: str,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    try:
        user.role = UserRole(role.lower())
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role") from exc

    db.commit()
    db.refresh(user)
    return {"id": user.id, "role": user.role.value}


@router.put("/users/{user_id}/status")
def toggle_user_status(
    user_id: int,
    active: bool,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_active = active
    db.commit()
    return {"id": user.id, "is_active": user.is_active}
