"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    advert.py
Author:      Josh Bassett
Date:        03/07/2025
Version:     1.0

Description: Provides a function to create an advert in the database.
"""

from app.database.db_connect import connect


def create_advert(values: dict, images: list) -> int:
    query: str = """
    INSERT INTO Adverts (lID, title, description, tennants, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    params: tuple = (
        values["lID"],
        values["title"],
        values["description"],
        values["price"],
        values["tennants"],
        *images
    )

    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, params)
    connection.commit()

    adID: int = cursor.lastrowid

    cursor.close()
    connection.close()

    return adID


def delete_advert(lID: int) -> bool:
    """
    The function deletes a value from the databse and returns the result.

    Args:
        lID (int): The landlord ID for the advert

    Returns:
        bool: Result
    """
    query: str = "DELETE FROM Adverts WHERE lID = %s"

    try:
        connection: object = connect()
        cursor: object = connection.cursor()

        cursor.execute(query, (lID,))
        connection.commit()

        deleted: bool = cursor.rowcount == 1

        cursor.close()
        connection.close()

        return deleted
    except Exception as err:
        print(f"Deletion failed: {err}")
        return False
