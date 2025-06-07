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
from app.security.hashing    import hash_pasword
from .images                 import upload_file
from ..utilities.authid      import authenticate
from app.utilities.mailgun   import send_email
import requests

register_bp: str = Blueprint("register_bp", __name__)

@register_bp.route('/register', methods = ['GET', 'POST'])
def register():
    """
    The REST API is responsible for creating a new user in the MySQL databse.

    The HTML form elements are parsed and required fields are verified.

    The attached profile picture is stored in the server and an image path is generated.

    Database connection is established and query is executed.

    Session (uID) value is set to the user ID and valid status is returned. Session
    (email) value is set to the user's email address.

    Verification email is sent to new user, with a link to /register/verify.

    Returns:
        json: Response of successs or appropriate error message
        html: Template render for account creation success
    """    

    if (request.method == 'POST'):

        email: str              = request.form.get('email')
        password: str           = request.form.get('password')
        name: str               = request.form.get('name')
        surname: str            = request.form.get('surname')
        age: int                = request.form.get('age')
        occupation: str         = request.form.get('occupation')
        bio: str                = request.form.get('bio')
        profile_picture: object = request.files.get('file')

        if (not email or not password or not name or not surname or not age):
            return jsonify({"error" : "Required fields not provided"}), 400

        image_path: str = upload_file(profile_picture, email)

        if image_path is None:
            return jsonify({"error" : "Image failed to upload"}), 409
        
        hashed_password: str = hash_pasword(password)

        connection: object = connect()
        cursor: object     = connection.cursor()

        query: str = """
            INSERT INTO Users (email, password, name, surname, age, occupation, bio, profilePicture)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(
            query, (email, hashed_password, name, surname, age, occupation, bio, image_path)
        )
        
        connection.commit()
        current_app.logger.info(f"MySQL status: {cursor.rowcount}")

        cursor.close()
        connection.close()

        user_id: int     = authenticate(email)
        session['uID']   = user_id
        session['email'] = email

        link: str    = "https://whondo.com/login/verify"
        sender: str  = "noreply@whondo.com"
        subject: str = "Activate Your Whondo Account"
        body: str    = f"Hi {name}!\nPlease follow this link to activate your new account.\n\n{link}"

        send_email(sender, name, email, subject, body)

        return render_template(
            "created.html", 
            name = name, 
            surname = surname, 
            email = email
        )
        
    else:
        return render_template("register.html")