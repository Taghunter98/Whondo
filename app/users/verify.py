"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    login.py
Author:      Josh Bassett
Date:        18/06/2025
Version:     1.0

Description: Serves a Blueprint API for verifying users.
"""

from flask import Blueprint, request, abort, render_template, session, jsonify

from app.database.db_connect import connect
from app.utilities.authid import authenticate

verify_bp = Blueprint("verify_bp", __name__)


@verify_bp.route("/verify")
def verify():
    email: str = request.args.get("email")

    if not email:
        abort(400, "Missing 'email' query parameter")

    user_id: int = authenticate(email)

    if user_id:
        connection: object = connect()
        cursor: object = connection.cursor()

        query: str = "UPDATE Users SET verified = true WHERE uID = %s"

        cursor.execute(query, (user_id,))
        connection.commit()
        cursor.close()
        connection.close()

        return render_template("verified.html", email=email)
    else:
        abort(404, "uID not found")


@verify_bp.route("/verify/me")
def verify_user():
    """
    The REST API returns the user information based on the session cookie data.

    Returns:
        Response: HTTP Response
    """
    if not session.get("uID"):
        return jsonify({"error": "User not logged in"}), 401

    connection: object = connect()
    cursor: object = connection.cursor(dictionary=True)

    query: str = "SELECT name, surname, email, profilePicture FROM Users WHERE uID = %s"

    cursor.execute(query, (session.get("uID"),))
    data: dict = cursor.fetchone()

    cursor.close()
    connection.close()

    if data is None:
        return jsonify({"error": "User data not found"}), 404

    return jsonify(data), 200

@verify_bp.route("/verify/landlord")
def verify_landlord():
    if not session.get("uID"):
        return jsonify({"error": "User not logged in"}), 401

    uID: int = session.get("email")

    connection: object = connect()
    cursor: object = connection.cursor()
    
    query: str = "INSERT INTO Landlords (uID) WHERE uID = %s"
    cursor.execute(query, (uID,))
    connection.commit()
    
    created: bool = cursor.rowcount == 1
    if created:
        return jsonify({"message": "landlord profile created"}), 201
    else:
        return jsonify({"error": "Unable to create landlord profile"}), 400