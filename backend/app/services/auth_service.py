from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password
from app.core.otp import generate_otp, get_otp_expiry
from app.services.email_service import send_verification_email


def create_user(
    db: Session,
    user_data: UserCreate
) -> User:

    existing_email = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_email:
        raise ValueError("Email already registered")

    existing_employee = (
        db.query(User)
        .filter(User.employee_id == user_data.employee_id)
        .first()
    )

    if existing_employee:
        raise ValueError("Employee ID already registered")

    # Generate OTP
    otp = generate_otp()
    otp_expiry = get_otp_expiry()

    user = User(
        employee_id=user_data.employee_id,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        role=user_data.role,
        is_verified=False,
        is_active=True,
        otp_code=otp,
        otp_expires_at=otp_expiry
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Send verification email
    try:
        send_verification_email(
            user.email,
            otp
        )
    except Exception as error:
        # Roll back the user if email sending fails
        db.delete(user)
        db.commit()

        raise ValueError(
            f"Unable to send verification email: {error}"
        )

    return user