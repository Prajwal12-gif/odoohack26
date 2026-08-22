from datetime import date

from pydantic import BaseModel


class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    phone: str | None = None
    department: str | None = None
    designation: str | None = None
    joining_date: date | None = None


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None
    department: str | None = None
    designation: str | None = None
    joining_date: date | None = None


class EmployeeResponse(EmployeeBase):
    id: int
    employee_id: str

    class Config:
        from_attributes = True