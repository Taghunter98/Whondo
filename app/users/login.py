"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    login.py
Author:      Josh Bassett
Date:        05/06/2025
Version:     1.0

Description: Serves a Blueprint API for logging in and verifying users. 
"""

from flask import Blueprint, request, session, jsonify, current_app, render_template, make_response

from ..utilities.authid      import authenticate
from app.database.db_connect import connect
from app.security.hashing    import check_password

login_bp = Blueprint("login_bp", __name__)

@login_bp.route('/login', methods = ['POST', 'GET'])
def login():
    """
    The REST API is responsibe for logging in the user from an external POST
    request with the user's email and plaintext password.

    Data integrity is verified and the user ID is authenticated based
    on the provided email.

    Database connection is established and query is executed.

    Password is verified against the hashed version and the user is validated.

    Session (uID) value is set to the user ID and valid status is returned. Session
    (email) value is set to the user's email address.

    Returns:
        json: Response of successs or appropriate error message
        html: Template render of login.html
    """    

    if request.method == 'POST':
        data: list    = request.get_json()
        email: str    = data.get('email')
        password: str = data.get('password')

        if (not email or not password):
            return jsonify({"error" : "User email or password not provided"}), 400
        
        user_id: int = authenticate(email)

        if (user_id is None):
            return jsonify({"error" : "User email does not match database records"}), 401
        
        connection: object = connect()
        cursor: object     = connection.cursor()

        query: str = f"""
            SELECT u.uID, u.password
            FROM Users u
            WHERE u.uID = {user_id};
        """

        cursor.execute(query)
        result = cursor.fetchone()

        cursor.close()
        connection.close()

        if (result is not None):
            hash_string: str = result[1]
            valid: bool      = check_password(password, hash_string)

            if (valid is True):
                session['uID']   = user_id
                session['email'] = email

                current_app.logger.info(f"User authenticated, starting new Session")

                response = make_response(jsonify({
                    "message" : f"{email} logged in successfully",
                    "status"  : True
                }), 200)
                response.set_cookie('uID', user_id)
                
                return response
            
            else:
                current_app.logger.error(f"User: {email} access denied, incorrect password")
                return jsonify({
                    "error"  : "Incorrect password",
                    "status" : False
                }), 401
        else:
            current_app.logger.error(f"User: {email} not found")
            return jsonify({"error":"User not found"}), 404
    else:
        return render_template("login.html")