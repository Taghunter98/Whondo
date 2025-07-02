"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    authid.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Fetches lID records that match provided email.
"""

from flask import current_app
from app.database.db_connect import connect
from app.utilities.authid import authenticate


def auth_landlord(email: str) -> int:

    if not email:
        current_app.logger.error("Email not supplied")
        return None
    
    uID: int = authenticate(email)

    connection: object = connect()
    cursor: object = connection.cursor()

    query: str = "SELECT l.lID, l.uID from Landlords l INNER JOIN Users u ON l.uID = u.uID WHERE u.uID = %s;"

    cursor.execute(query, (uID,))
    result = cursor.fetchone()

    cursor.close()
    connection.close()

    if result is not None:
        lID: int = result[0]
        return lID
    else:
        current_app.logger.error("Email does not match uID records in database")
        return None
