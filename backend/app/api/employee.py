from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.employee import Employee
from app.models.user import User
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate
)
from app.services.employee_service import (
    create_employee_profile,
    get_employee_profile,
    update_employee_profile
)
from app.core.permissions import require_employee
from app.core.security import get_current_user


router = APIRouter(
    prefix="/employees",
    tags=["Employee Profile"]
)


@router.post(
    "/profile",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def create_profile(
    employee_data: EmployeeCreate,
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db)
):
    try:
        employee = create_employee_profile(
            db=db,
            user=current_user,
            first_name=employee_data.first_name,
            last_name=employee_data.last_name,
            phone=employee_data.phone,
            department=employee_data.department,
            designation=employee_data.designation,
            joining_date=employee_data.joining_date
        )

        return {
            "id": employee.id,
            "employee_id": current_user.employee_id,
            "first_name": employee.first_name,
            "last_name": employee.last_name,
            "phone": employee.phone,
            "department": employee.department,
            "designation": employee.designation,
            "joining_date": employee.joining_date
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )


@router.get(
    "/profile",
    response_model=EmployeeResponse
)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    employee = get_employee_profile(db, current_user)

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee profile not found"
        )

    return {
        "id": employee.id,
        "employee_id": current_user.employee_id,
        "first_name": employee.first_name,
        "last_name": employee.last_name,
        "phone": employee.phone,
        "department": employee.department,
        "designation": employee.designation,
        "joining_date": employee.joining_date
    }


@router.put(
    "/profile",
    response_model=EmployeeResponse
)
def update_profile(
    employee_data: EmployeeUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    employee = get_employee_profile(db, current_user)

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee profile not found"
        )

    employee = update_employee_profile(
        db=db,
        employee=employee,
        first_name=employee_data.first_name,
        last_name=employee_data.last_name,
        phone=employee_data.phone,
        department=employee_data.department,
        designation=employee_data.designation,
        joining_date=employee_data.joining_date
    )

    return {
        "id": employee.id,
        "employee_id": current_user.employee_id,
        "first_name": employee.first_name,
        "last_name": employee.last_name,
        "phone": employee.phone,
        "department": employee.department,
        "designation": employee.designation,
        "joining_date": employee.joining_date
    }