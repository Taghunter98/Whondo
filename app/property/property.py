"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    login.py
Author:      Josh Bassett
Date:        05/06/2025
Version:     1.0

Description: Serves a Blueprint API for logging in and verifying users.
"""

from flask import current_app

from app.database.db_connect import connect


def create_property(values: dict) -> int:
    """
    The function inserts a new Property object into the database and returns the ID.

    Args:
        values (dict): Dictionary of sql values.

    Returns:
        bool: Property ID (pID)
    """
    query: str = """
    INSERT INTO Property (propType, bedrooms, bathrooms, name, street, town, county, postcode, lID)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    params: tuple = (
        values["propType"],
        values["bedrooms"],
        values["bathrooms"],
        values["name"],
        values["street"],
        values["town"],
        values["county"],
        values["postcode"],
        values["lID"],
    )

    try:
        connection: object = connect()
        cursor: object = connection.cursor()

        cursor.execute(query, params)
        connection.commit()

        pID: int = cursor.lastrowid

        cursor.close()
        connection.close()

        return pID

    except Exception as err:
        current_app.logger.error(f"Insert failed: {err}")
        return -1


def delete_property(lID: int) -> bool:
    """
    The function deletes a value from the databse and returns the result.

    Args:
        lID (int): The landlord ID for the property

    Returns:
        bool: Result
    """
    query: str = "DELETE FROM Property WHERE lID = %s"

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
        current_app.logger.error(f"Deletion failed: {err}")
        return False


def update_property(values: dict) -> bool:
    """
    The function updates the property and returns the result.

    Args:
        values (dict): Dictionary of sql values

    Returns:
        bool: Result
    """
    query: str = """
    UPDATE Property
    SET propType = %s, bedrooms = %s, bathrooms = %s, name = %s, street = %s, town = %s, county = %s, postcode = %s
    WHERE lID = %s;
    """

    params: tuple = (
        values["propType"],
        values["bedrooms"],
        values["bathrooms"],
        values["name"],
        values["street"],
        values["town"],
        values["county"],
        values["postcode"],
        values["lID"],
    )

    try:
        connection: object = connect()
        cursor: object = connection.cursor()

        cursor.execute(query, params)
        connection.commit()

        cursor.close()
        connection.close()

        return True

    except Exception as err:
        current_app.logger.error(f"Update failed: {err}")
        return False
