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
    INSERT INTO Property (propType, bedrooms, bathrooms, name, street, town, postcode, lID, kID)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    params: tuple = (
        values["propType"],
        values["bedrooms"],
        values["bathrooms"],
        values["name"],
        values["street"],
        values["town"],
        values["postcode"],
        values["lID"],
        values["kID"],
    )

    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, params)

    connection.commit()

    inserted: bool = cursor.rowcount() == 1

    cursor.close()
    connection.close()

    return inserted


def delete_property(lID: int) -> bool:
    query: str = """
    DELETE FROM Property
    WHERE lID = %s
    """

    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, str(lID),)

    connection.commit()

    deleted: bool = cursor.rowcount() == 1

    cursor.close()
    connection.close()

    return deleted
