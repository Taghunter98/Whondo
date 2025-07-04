"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    keywords.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Provides a function to store keywords in the database.
"""

from app.database.db_connect import connect


def store_keywords(keywords: list) -> int:
    """
    The function stores the keywords provided in the database and returns the kID.

    Args:
        keywords (list): List of keywords

    Returns:
        int: The keyword ID (kID)
    """
    fields = []
    for key in keywords:
        fields.append(key)

    connection: object = connect()
    cursor: object = connection.cursor()

    query = f"INSERT INTO Keywords ({', '.join(f for f in fields)}) VALUES({', '.join('1' for i in range(len(keywords)))});"

    cursor.execute(query)
    connection.commit()

    kID: int = cursor.lastrowid

    cursor.close()
    connection.close()

    return kID

def delete_keywords(kID: int) -> bool:
    """
    The function deletes a value from the databse and returns the result.

    Args:
        lID (int): The landlord ID for the advert

    Returns:
        bool: Result
    """
    query: str = "DELETE FROM Adverts WHERE kID = %s"

    
    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, (kID,))
    connection.commit()

    deleted: bool = cursor.rowcount == 1

    cursor.close()
    connection.close()

    return deleted