from datetime import date

from sqlalchemy.orm import Session

from app.models.payroll import Payroll, PayrollStatus


def get_employee_payroll(db: Session, employee_id: int):
    return (
        db.query(Payroll)
        .filter(Payroll.employee_id == employee_id)
        .order_by(Payroll.salary_month.desc())
        .all()
    )


def get_all_payrolls(db: Session):
    return db.query(Payroll).order_by(Payroll.salary_month.desc()).all()


def upsert_payroll(db: Session, employee_id: int, salary_month: date, basic_salary: float, allowances: float = 0, deductions: float = 0, status: str = PayrollStatus.DRAFT.value):
    payroll = (
        db.query(Payroll)
        .filter(Payroll.employee_id == employee_id)
        .filter(Payroll.salary_month == salary_month)
        .first()
    )

    if payroll is None:
        payroll = Payroll(
            employee_id=employee_id,
            salary_month=salary_month,
            basic_salary=basic_salary,
            allowances=allowances,
            deductions=deductions,
            status=status,
        )
        db.add(payroll)
    else:
        payroll.basic_salary = basic_salary
        payroll.allowances = allowances
        payroll.deductions = deductions
        payroll.status = status

    payroll.net_salary = float(payroll.basic_salary) + float(payroll.allowances) - float(payroll.deductions)
    db.commit()
    db.refresh(payroll)
    return payroll
