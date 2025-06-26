"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    login.py
Author:      Josh Bassett
Date:        05/06/2025
Version:     1.0

Description: Serves a Blueprint API for logging in and verifying users.
"""

from flask import current_app, jsonify

from app.database.db_connect import connect


def create_property(values: dict) -> bool:
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

        inserted: bool = cursor.rowcount == 1

        cursor.close()
        connection.close()

        return inserted

    except Exception as err:
        print(f"Insert failed: {err}")
        return False


def delete_property(lID: int) -> bool:
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
        print(f"Deletion failed: {err}")
        return False

def update_property(values: dict):
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

        print(f"Rows: {cursor.rowcount}")
        inserted: bool = cursor.rowcount >= 0

        cursor.close()
        connection.close()

        return inserted

    except Exception as err:
        print(f"Update failed: {err}")
        return False