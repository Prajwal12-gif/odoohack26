import smtplib
from email.message import EmailMessage

from app.config import settings


message = EmailMessage()

message["Subject"] = "OdooHack26 SMTP Test"
message["From"] = settings.SMTP_USERNAME
message["To"] = settings.SMTP_USERNAME

message.set_content(
    "SMTP is working successfully for the OdooHack26 backend."
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


print("Email sent successfully!")