"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    advert.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Serves a Blueprint API for creating a new advert.
"""

from flask import Blueprint, request, jsonify, session, redirect, current_app

from app.utilities.auth_lid import auth_landlord
from app.database.db_connect import connect
from app.users.images import upload_file

advert_bp = Blueprint("advert_bp", __name__)

@advert_bp.route("/advert/new", methods=["POST", "GET"])
def advert():
    if request.method == "POST":
        if not session['email']:
            redirect("/")
        
        data: object = request.get_json()
        title: str = data.get("title")
        description: str = data.get("description")
        keywords: list = data.get("keywords")
        tennants: int = data.get("tennants")
        images: list = request.files.getlist()

        if not title or not description or not keywords or not images:
            return jsonify({"error": "Required fields are not provided"}), 400

        # Authenticate landlord
        email: str = session['email']
        lID: int = auth_landlord(email)

        if not lID:
            current_app.logger.warning("Unauthorised landlord login attempt")
            return jsonify({"error": "Unauthorised user is not a landlord"}), 401
        
        # Files upload -> move this to images when refactoring
        uploaded_files: list = []
        for file in images:
            uploaded_files.append(upload_file(file, email))

        image_paths: list = []
        for i in range(10):
            if i < len(uploaded_files):
                image_paths.append(uploaded_files[i])
            else:
                image_paths.append("NULL")
        
        query_images: str = ", ".join(img for img in image_paths)

        connection: object = connect()
        cursor: object = connection.cursor()

        query: str = """
        INSERT INTO Adverts
        """

        cursor.execute()

        connection.commit()
        current_app.logger.info(f"MySQL status: {cursor.rowcount}")

        cursor.close()
        connection.close()

    else:
        redirect("/")