from flask import Blueprint, request, jsonify

from .authid import authenticate
from app.database.db_connect import connect

login_api = Blueprint("login_api", __name__)

@login_api.route('/login/auth', methods = ('POST'))
def login():

    email:str    = request.get_data['email']
    password:str = request.get_data['password']

    if not email or password:
        return jsonify({
            "error": "ERROR: User email or password not provided"
        })
    
    user_id:int = authenticate(email)

    if (user_id == None):
        return jsonify({
            "error": "ERROR: User email does not match database records"
        })