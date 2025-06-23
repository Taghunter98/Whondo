"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    key_gen.py
Author:      Josh Bassett
Date:        23/06/2025
Version:     1.0

Description: Provides function for creating API keys.
"""

import secrets

from app.database.db_connect import connect


def gen_key() -> str:
    """
    Function generates url safe API keys of 30 char length.

    Returns:
        str: API key
    """
    return secrets.token_urlsafe(30)


def auth_key(key: str) -> bool:
    """
    The function queries the database and checks if API key is valid.

    Args:
        key (str): API key

    Returns:
        bool: Key validation
    """
    connection: object = connect()
    cursor: object = connection.cursor()

    query: str = """
        SELECT COUNT(*) 
        FROM APIKeys 
        WHERE apiKey = %s;
    """

    cursor.execute(query, (key,))
    count: int = cursor.fetchone()

    cursor.close()
    connection.close()

    return True if (1 in count) else False
