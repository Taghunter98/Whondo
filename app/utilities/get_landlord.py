"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    get_landlord.py
Author:      Josh Bassett
Date:        19/07/2025
Version:     1.0

Description: Returns landlord information.
"""

from typing import Optional

from app.database.db_connect import connect

def get_landlord_info(lID: int) -> Optional[dict[str, any]]:

    try:
        connection: object = connect()
        cursor: object = connection.cursor()

        query: str = f"""
        SELECT u.name, u.surname, u.email
        FROM Users u
        JOIN Landlords l ON l.uID = u.uID
        WHERE l.lID = {lID};
        """

        cursor.execute(query)
        row: tuple = cursor.fetchone()

        if not row:
            return None
        
        cols: dict[str, any] = [col[0] for col in cursor.description]
        return dict(zip(cols, row))

    finally:
        cursor.close()
        connection.close()