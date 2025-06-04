from flask import Blueprint, request, jsonify

from .authid import authenticate
from app.database.db_connect import connect
from app.security.hashing import check_password

login_bp = Blueprint("login_bp", __name__)

@login_bp.route('/login/auth', methods = ['POST'])
def login():

    email:str    = request.get_data['email']
    password:str = request.get_data['password']

    if not email or password:
        return jsonify({
            "error": "ERROR: User email or password not provided"
        })
    
    user_id:int = authenticate(email)

    if (user_id is None):
        return jsonify({
            "error": "ERROR: User email does not match database records"
        })
    
    connecttion = connect()
    cursor      = connecttion.cursor()

    query:str = f"""
        SELECT u.uID, u.password
        FROM Users u
        WHERE u.uID = {user_id};
    """

    cursor.execute(query)
    result = cursor.fetchone()

    if (result is not None):
        hash_string:str = result[0]
        valid:bool = check_password(password, hash_string)
        if (valid is True):
            return jsonify({
                "message": f"SUCCESS: User {email} logged in successfully",
                "status": valid
            })