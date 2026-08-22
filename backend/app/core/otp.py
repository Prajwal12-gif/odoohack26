import secrets
from datetime import datetime, timedelta, timezone


OTP_EXPIRY_MINUTES = 10


def generate_otp() -> str:
    """
    Generate a secure 6-digit OTP.
    """
    return str(secrets.randbelow(900000) + 100000)


def get_otp_expiry() -> datetime:
    """
    Return the expiration time for the OTP.
    """
    return datetime.now(timezone.utc) + timedelta(
        minutes=OTP_EXPIRY_MINUTES
    )