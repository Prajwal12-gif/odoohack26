from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.permissions import require_employee, require_hr
from app.database import get_db
from app.models.employee import Employee
from app.models.payroll import Payroll
from app.models.user import User
from app.schemas.payroll import PayrollCreate, PayrollResponse, PayrollUpdate
from app.services.payroll_service import get_all_payrolls, get_employee_payroll, upsert_payroll

router = APIRouter(prefix="/payroll", tags=["Payroll"])


@router.get("/me", response_model=list[PayrollResponse])
def my_payroll(
    current_user: User = Depends(require_employee),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found")
    return get_employee_payroll(db, employee.id)


@router.get("/all", response_model=list[PayrollResponse])
def all_payrolls(
    _: User = Depends(require_hr),
    db: Session = Depends(get_db),
):
    return get_all_payrolls(db)


@router.post("/employee/{employee_id}", response_model=PayrollResponse, status_code=status.HTTP_201_CREATED)
def upsert_employee_payroll(
    employee_id: int,
    payload: PayrollCreate,
    _: User = Depends(require_hr),
    db: Session = Depends(get_db),
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")

    payroll = upsert_payroll(
        db,
        employee.id,
        payload.salary_month,
        payload.basic_salary,
        payload.allowances,
        payload.deductions,
        payload.status,
    )
    return payroll


@router.put("/employee/{employee_id}/{month}", response_model=PayrollResponse)
def update_employee_payroll(
    employee_id: int,
    month: str,
    payload: PayrollUpdate,
    _: User = Depends(require_hr),
    db: Session = Depends(get_db),
):
    salary_month = date.fromisoformat(month)
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")

    payroll = (
        db.query(Payroll)
        .filter(Payroll.employee_id == employee.id)
        .filter(Payroll.salary_month == salary_month)
        .first()
    )
    if not payroll:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payroll entry not found")

    if payload.basic_salary is not None:
        payroll.basic_salary = payload.basic_salary
    if payload.allowances is not None:
        payroll.allowances = payload.allowances
    if payload.deductions is not None:
        payroll.deductions = payload.deductions
    if payload.status is not None:
        payroll.status = payload.status

    payroll.net_salary = float(payroll.basic_salary) + float(payroll.allowances) - float(payroll.deductions)
    db.commit()
    db.refresh(payroll)
    return payroll
