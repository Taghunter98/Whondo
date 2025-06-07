"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    authid.py
Author:      Josh Bassett
Date:        05/06/2025
Version:     1.0

Description: Fetches uID records that match provided email. 
"""

from flask                   import current_app
from app.database.db_connect import connect

def authenticate(email: str) -> int:
    """
    A function to authenticate users, by returning the user ID by querying 
    the database with the provided email.

    The funtion enforces integer type for the returned user ID.

    Args:
        email (str): The user's email

    Returns:
        int: The user ID (uID)
    """

    if not email:
        current_app.logger.error("Email not supplied")
        return None
        
    connection: object = connect()
    cursor: object     = connection.cursor()

    query: str = f"""
        SELECT u.uID, u.email 
        FROM Users u 
        WHERE u.email = "{email}" 
        GROUP BY u.uID
    """
    
    cursor.execute(query)
    result = cursor.fetchone()

    cursor.close()
    connection.close()

    if (result is not None):
        user_id: int = result[0]
        return user_id
    else:
        current_app.logger.error("Email does not match uID records in database")
        return None