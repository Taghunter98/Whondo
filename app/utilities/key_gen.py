"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    key_gen.py
Author:      Josh Bassett
Date:        23/06/2025
Version:     1.0

Description: Provides function and API for creating API keys.
"""

from flask import Blueprint, request, jsonify, current_app, session
import secrets

from app.database.db_connect import connect
from app.security.hashing import hash_function, check_password
from app.utilities.authid import authenticate

gen_key_bp = Blueprint("gen_key_bp", __name__)

@gen_key_bp.route("/auth/keygen", methods=["GET"])
def gen_key():
    email: str = request.args.get("email")
    uID: int = authenticate(email)
    if uID:
        key: str = secrets.token_urlsafe(30)
        hashed: str = hash_function(key)

        connection: object = connect()
        cursor: object = connection.cursor()

        query: str = """
            INSERT INTO APIKeys (uID, apiKey)
            VALUES (%s, %s)
        """

        cursor.execute(query, (uID, hashed))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"key" : key}), 201
    else:
        current_app.logger.warning("Unauthorised key generation attempt")
        return jsonify({"error": "Unauthrorised key generation, this will be reported"}), 401

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

    uID = session['uID']

    query: str = f"""
        SELECT apiKey
        FROM APIKeys 
        WHERE uID = {uID};
    """

    cursor.execute(query)
    hash_key: str = cursor.fetchone()

    cursor.close()
    connection.close()

    return True if (check_password(key, hash_key)) else False
