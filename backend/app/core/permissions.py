from fastapi import Depends, HTTPException, status

from app.models.user import User, UserRole
from app.routes.auth import get_current_user


def require_employee(
    current_user: User = Depends(get_current_user)
) -> User:

    if current_user.role not in [
        UserRole.EMPLOYEE,
        UserRole.HR_OFFICER,
        UserRole.ADMIN
    ]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee access required"
        )

    return current_user


def require_hr(
    current_user: User = Depends(get_current_user)
) -> User:

    if current_user.role not in [
        UserRole.HR_OFFICER,
        UserRole.ADMIN
    ]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="HR Officer access required"
        )

    return current_user


def require_admin(
    current_user: User = Depends(get_current_user)
) -> User:

    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    return current_user