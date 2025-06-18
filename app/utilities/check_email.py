"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    check_email.py
Author:      Josh Bassett
Date:        07/06/2025
Version:     1.0

Description: Checks email against database records.
"""

from app.database.db_connect import connect


def check_email_exits(email: str) -> bool:
    """
    The function checks if an email exists in the database.

    Args:
        email (str): Email input

    Returns:
        bool: If email exists
    """

    connection: object = connect()
    cursor: object = connection.cursor()

    query: str = """
        SELECT COUNT(*) 
        FROM Users 
        WHERE email = %s;
    """

    cursor.execute(query, (email,))
    count: int = cursor.fetchone()

    cursor.close()
    connection.close()

    return True if (1 in count) else False
