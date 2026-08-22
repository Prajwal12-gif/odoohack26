import smtplib
from email.message import EmailMessage

from app.config import settings


def send_verification_email(
    recipient_email: str,
    otp: str
) -> None:

    message = EmailMessage()

    message["Subject"] = "Verify your OdooHack26 account"
    message["From"] = settings.SMTP_USERNAME
    message["To"] = recipient_email

    message.set_content(
        f"""
Hello,

Your OdooHack26 email verification code is:

{otp}

This OTP is valid for 10 minutes.

If you did not create this account, please ignore this email.

Regards,
OdooHack26 Team
"""
    )

    with smtplib.SMTP(
        settings.SMTP_HOST,
        settings.SMTP_PORT
    ) as server:

        server.starttls()

        server.login(
            settings.SMTP_USERNAME,
            settings.SMTP_PASSWORD
        )

        server.send_message(message)