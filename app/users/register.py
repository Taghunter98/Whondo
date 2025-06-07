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

register_bp = Blueprint("register_bp", __name__)

@register_bp.route('/register/create', methods = ['GET', 'POST'])
def register():

    if (request.method == 'POST'):
        email:str       = request.form.get('email')
        password:str    = request.form.get('password')
        name:str        = request.form.get('name')
        surname:str     = request.form.get('surname')
        age:int         = request.form.get('age')
        occupation:str  = request.form.get('occupation')
        bio:str         = request.form.get('bio')
        profile_picture = request.files.get('file')

        if (not email or not password or not name or not surname or not age):
            return jsonify({"error" : "Required fields not provided"}), 400
        
        if (profile_picture):
            image_path:str = upload_file(profile_picture, email)

            if image_path is None:
                image_path = ''
                return jsonify({"error" : "Image failed to upload"}), 409
        
        hashed_password:str = hash_pasword(password)

        connection = connect()
        cursor     = connection.cursor()

        query:str = """
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

        session['email'] = email

        # return jsonify({"message" : f"User {email} created successfully", "status" : True}, ), 201
        return render_template("created.html", name = name, surname = surname)
    else:
        return render_template("register.html")