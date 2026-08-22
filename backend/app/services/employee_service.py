from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.user import User


def get_employee_profile(
    db: Session,
    user: User
) -> Employee | None:

    return (
        db.query(Employee)
        .filter(Employee.user_id == user.id)
        .first()
    )


def create_employee_profile(
    db: Session,
    user: User,
    first_name: str,
    last_name: str,
    phone: str | None = None,
    department: str | None = None,
    designation: str | None = None,
    joining_date=None
) -> Employee:

    existing_profile = get_employee_profile(db, user)

    if existing_profile:
        raise ValueError("Employee profile already exists")

    employee = Employee(
        user_id=user.id,
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        department=department,
        designation=designation,
        joining_date=joining_date
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


def update_employee_profile(
    db: Session,
    employee: Employee,
    first_name: str | None = None,
    last_name: str | None = None,
    phone: str | None = None,
    department: str | None = None,
    designation: str | None = None,
    joining_date=None
) -> Employee:

    if first_name is not None:
        employee.first_name = first_name

    if last_name is not None:
        employee.last_name = last_name

    if phone is not None:
        employee.phone = phone

    if department is not None:
        employee.department = department

    if designation is not None:
        employee.designation = designation

    if joining_date is not None:
        employee.joining_date = joining_date

    db.commit()
    db.refresh(employee)

    return employee