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
    INSERT INTO Adverts (title, price, description, tennants, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    params: tuple = (
        values["title"],
        values["price"],
        values["description"],
        values["tennants"],
        *images,
    )

    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, params)
    connection.commit()

    adID: int = cursor.lastrowid

    cursor.close()
    connection.close()

    return adID

def update_advert(values: dict, images: list, adID) -> bool:
    query: str = """
    UPDATE Adverts 
    SET title = %s, price = %s, description = %s, tennants = %s, image1 = %s, image2 = %s, image3 = %s, image4 = %s, image5 = %s, image6 = %s, image7 = %s, image8 = %s, image9 = %s, image10 = %s
    WHERE adID = %s
    """

    params: tuple = (
        values["title"],
        values["price"],
        values["description"],
        values["tennants"],
        *images,
        adID
    )

    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, params)
    connection.commit()

    updated: bool = cursor.rowcount == 1

    cursor.close()
    connection.close()

    return updated


def delete_advert(adID: int) -> bool:
    """
    The function deletes a value from the databse and returns the result.

    Args:
        lID (int): The landlord ID for the advert

    Returns:
        bool: Result
    """
    query: str = "DELETE FROM Adverts WHERE adID = %s"

    
    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, (adID,))
    connection.commit()

    deleted: bool = cursor.rowcount == 1

    cursor.close()
    connection.close()

    return deleted
  
