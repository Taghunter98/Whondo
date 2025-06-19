import os
from flask import current_app
from requests import post
from dotenv import load_dotenv

def send_email(sender: str, receiver_name: str, receiver: str,
               subject: str, text_message: str, html_message: str) -> str:
    """
    Sends an email using Mailgun with both plain text and HTML content.

    Args:
        sender (str): Sender email address.
        receiver_name (str): Name of the recipient.
        receiver (str): Email address of the recipient.
        subject (str): Email subject.
        text_message (str): Plain text email content.
        html_message (str): HTML email content.

    Returns:
        str: Response from the Mailgun API.
    """
    load_dotenv()
    MAILGUN_API_KEY: str = os.getenv("MAILGUN_API_KEY")
    MAILGUN_URL: str = os.getenv("MAILGUN_URL")

    if not MAILGUN_API_KEY or not MAILGUN_URL:
        current_app.logger.error("Mailgun API credentials not found or missing")
        return None

    return post(
        MAILGUN_URL,
        auth=("api", MAILGUN_API_KEY),
        data={
            "from": sender,
            "to": f"{receiver_name} <{receiver}>",
            "subject": subject,
            "text": text_message,
            "html": html_message,
        }
    )
