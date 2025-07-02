"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    keywords.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Provides a function to store keywords in the database.
"""

from flask import current_app

from app.database.db_connect import connect


def store_keywords(keywords: list) -> bool:
    fields = []
    for key in keywords:
        fields.append(key)

    try:
        connection: object = connect()
        cursor: object = connection.cursor()

        query = f"INSERT INTO Keywords ({', '.join(f for f in fields)}) VALUES({', '.join('1' for i in range(len(keywords)))});"

        cursor.execute(query)

        inserted: bool = cursor.rowcount == 1

        cursor.close()
        connection.close()

        return inserted

    except Exception as err:
        current_app.logger.error(f"Insert failed: {err}")
        return False
