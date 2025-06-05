from flask import Blueprint, request, session, jsonify

from .authid import authenticate
from app.database.db_connect import connect
from app.security.hashing import check_password

login_bp = Blueprint("login_bp", __name__)

@login_bp.route('/login/auth', methods = ['POST'])
def login():
    """
    The REST API is responsibe for logging in the user from an external
    POST request with the user's email and plaintext password.

    The data is

    Returns:
        json: json response of successs or appropriate error message
    """    

    data         = request.get_json()
    email:str    = data.get('email')
    password:str = data.get('password')

    if not email or  not password:
        return jsonify({"error" : "ERROR: User email or password not provided"}), 400
    
    user_id:int = authenticate(email)

    if (user_id is None):
        return jsonify({"error" : "ERROR: User email does not match database records"}), 401
    
    session['uID'] = user_id
    
    connection = connect()
    cursor     = connection.cursor()

    query:str = f"""
        SELECT u.uID, u.password
        FROM Users u
        WHERE u.uID = {user_id};
    """

    cursor.execute(query)
    result = cursor.fetchone()

    cursor.close()
    connection.close()

    if (result is not None):
        hash_string:str = result[1]
        valid:bool = check_password(password, hash_string)
        if (valid is True):
            return jsonify({
                "message" : f"SUCCESS: User {email} logged in successfully",
                "status"  : True
            }), 200
        else:
            return jsonify({
                "error"  : "ERROR: Incorrect Password",
                "status" : False
            }), 401
    else:
        return jsonify({"error":"ERROR: User not found"}), 404