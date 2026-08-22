from datetime import date

from pydantic import BaseModel


class PayrollCreate(BaseModel):
    salary_month: date
    basic_salary: float
    allowances: float = 0
    deductions: float = 0
    status: str = "draft"


class PayrollUpdate(BaseModel):
    basic_salary: float | None = None
    allowances: float | None = None
    deductions: float | None = None
    status: str | None = None


class PayrollResponse(BaseModel):
    id: int
    employee_id: int
    salary_month: date
    basic_salary: float
    allowances: float
    deductions: float
    net_salary: float
    status: str

    class Config:
        from_attributes = True
