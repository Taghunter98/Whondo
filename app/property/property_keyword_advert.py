"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    property_keyword_advert.py
Author:      Josh Bassett
Date:        07/07/2025
Version:     1.0

Description: Provides a helper function to return ID's from PropertyKeywordAdvert.
"""

from app.database.db_connect import connect


def get_ids(pkaID: int) -> list:
    """
    The helper function returns the ID records from the 3NF table.

    Args:
        pkaID (int): The primary key for the PropertyKeywordAdvert table

    Returns:
        list: List of ID records
    """
    connection: object = connect()
    cursor: object = connection.cursor(dictionary=True)

    query: str = "SELECT pID, kID, adID FROM PropertyKeywordAdvert WHERE pkaID = %s"

    cursor.execute(query, (pkaID,))
    data: list = cursor.fetchall()

    cursor.close()
    connection.close()

    return data
