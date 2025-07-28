"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    register.py
Author:      Josh Bassett
Date:        06/06/2025
Version:     1.0

Description: Serves a Blueprint API for registering a new user.
"""

from flask import Blueprint, request, jsonify, current_app, render_template, session

from app.database.db_connect import connect
from app.security.hashing import hash_function
from .images import upload_file
from ..utilities.authid import authenticate
from app.utilities.mailgun import send_email
from app.utilities.check_email import check_email_exits

register_bp: str = Blueprint("register_bp", __name__)


@register_bp.route("/register", methods=["GET", "POST"])
def register():
    """
    The REST API is responsible for creating a new user in the MySQL databse.

    The HTML form elements are parsed and required fields are verified.

    Email availability is checked to avoid duplicate accounts.

    The attached profile picture is stored in the server and an image path is generated.

    Database connection is established and query is executed.

    Session (uID) value is set to the user ID and valid status is returned. Session
    (email) value is set to the user's email address.

    Verification email is sent to new user, with a link to /register/verify.

    Returns:
        Response: Response of successs or appropriate error message
    """

    if request.method == "POST":
        email: str = request.form.get("email")
        password: str = request.form.get("password")
        name: str = request.form.get("name")
        surname: str = request.form.get("surname")
        age: int = request.form.get("age")
        occupation: str = request.form.get("occupation")
        bio: str = request.form.get("bio")
        profile_picture: object = request.files.get("file")

        if not email or not password or not name or not surname or not age:
            return jsonify({"error": "Required fields not provided"}), 400

        if check_email_exits(email):
            return jsonify({"error": "Account already exists"}), 403

        image_path = None

        if profile_picture:
            image_path: str = upload_file(profile_picture, email)

            if image_path is None:
                return jsonify({"error": "Image failed to upload"}), 409

        hashed_password: str = hash_function(password)

        connection: object = connect()
        cursor: object = connection.cursor()

        query: str = """
            INSERT INTO Users (email, password, name, surname, age, occupation, bio, profilePicture)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(
            query,
            (email, hashed_password, name, surname, age, occupation, bio, image_path),
        )

        connection.commit()
        current_app.logger.info(f"MySQL status: {cursor.rowcount}")

        cursor.close()
        connection.close()

        user_id: int = authenticate(email)
        session["uID"] = user_id
        session["email"] = email

        verify_link = f"https://whondo.com/verify?email={email}"
        sender = "noreply@whondo.com"
        subject = "Verify Your Whondo Account"

        html_template = render_template(
            "verify_email.html", name=name, verify_link=verify_link
        )

        send_email(sender, name, email, subject, None, html_template)

        return jsonify({"message": "Account created successfully"})

    else:
        return render_template("register.html")