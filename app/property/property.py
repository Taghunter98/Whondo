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
    query: str = f"""
    DELETE FROM Property
    WHERE lID = "{lID}"
    """

    try:
        connection: object = connect()
        cursor: object = connection.cursor()

        cursor.execute(query)
        connection.commit()

        deleted: bool = cursor.rowcount == 1

        cursor.close()
        connection.close()

        return deleted
    except Exception as err:
        print(f"Deletion failed: {err}")
        return False
