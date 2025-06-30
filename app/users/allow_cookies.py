from flask import Blueprint, request, redirect

allow_cookies_bp = Blueprint("allow_cookies_bp", __name__)

from app.database.db_connect import connect

@allow_cookies_bp.route("/cookies", methods=["POST", "GET"])
def allow_cookies():
    
    if request.method == "POST":
        data: object = request.get_json()
        allow: bool = data.get("status")

        if allow:
            connection: object = connect()
            cursor: object = connection.cursor()

            query = "INSERT INTO USERS"

    else:
        redirect("/")

