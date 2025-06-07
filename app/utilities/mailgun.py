"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    mailgun.py
Author:      Josh Bassett
Date:        07/06/2025
Version:     1.0

Description: Provides function to send authenticated emails using mailgun.
"""


from requests import post
from dotenv   import load_dotenv
from flask    import current_app
import os

def send_email(sender: str, reciever_name: str, reciever: str, subject: str, message: str) -> str:
    """
    The function sends an email using mailgun with the provided parameters.

    Args:
        sender (str): Sender email address
        reciever_name (str): Name of recipient
        reciever (str): Email of recipient
        subject (str): Email subject
        message (str): Email message

    Returns:
        str: Status of email 
    """
    
    load_dotenv()
    
    MAILGUN_API_KEY: str = os.getenv('MAILGUN_API_KEY')
    MAILGUN_URL: str     = os.getenv('MAILGUN_URL')

    if (not MAILGUN_API_KEY and not MAILGUN_URL):
        current_app.logger.error("Mailgun API credentials not found or missing")
        return None
    
    return post(
        MAILGUN_URL,
        auth  = ("api", MAILGUN_API_KEY), 
        data  = {
            "from": f"{sender}",
            "to": f"{reciever_name} <{reciever}>",
            "subject": f"{subject}",
            "text": message,
        }
    )