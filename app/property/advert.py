"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    advert.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Serves a Blueprint API for creating a new advert.
"""

from flask import Blueprint, request, jsonify, session, redirect, current_app, render_template
import json

from app.utilities.auth_lid import auth_landlord
from app.database.db_connect import connect
from app.users.images import upload_file
from app.property.keywords import store_keywords
from app.property.property import create_property

advert_bp = Blueprint("advert_bp", __name__)


@advert_bp.route("/advert/new", methods=["POST", "GET"])
def advert():
    if request.method == "POST":
        # if not session["email"]:  REFACTOR THIS IN PRODUCTION
        #     redirect("/")

        email: str = request.form.get("email")
        title: str = request.form.get("title")
        description: str = request.form.get("description")
        keywords_raw: bytes = request.form.get("keywords")
        tennants: int = int(request.form.get("tennants"))
        images: list = request.files.getlist("images")

        keywords: list = json.loads(keywords_raw)

        if not title or not description or not keywords or not images:
            return jsonify({"error": "Required fields are not provided"}), 400

        # email: str = session["email"]
        lID: int = auth_landlord(email)

        if not lID:
            current_app.logger.warning("Unauthorised landlord login attempt")
            return jsonify({"error": "Unauthorised user is not a landlord"}), 401

        prop_data = {
            "propType": request.form.get("propType"),
            "bedrooms": request.form.get("bedrooms"),
            "bathrooms": request.form.get("bathrooms"),
            "name": request.form.get("name"),
            "street": request.form.get("street"),
            "town": request.form.get("town"),
            "county": request.form.get("county"),
            "postcode": request.form.get("postcode"),
            "lID": lID,
        }

        if any(e is None for e in prop_data):
            return jsonify({"error": "Required property fields are not provided"}), 400

        # Files upload -> move this to images when refactoring
        uploaded_files: list = []
        for file in images:
            uploaded_files.append(upload_file(file, email))

        image_paths: list = []
        for i in range(10):
            if i < len(uploaded_files):
                image_paths.append(uploaded_files[i])
            else:
                image_paths.append(None)

        connection: object = connect()
        cursor: object = connection.cursor()

        kID: int = store_keywords(keywords)
        pID: int = create_property(prop_data)

        if not kID or not pID:
            return jsonify({"error": "Keyword or Property upload failed"}), 400

        query = """
        INSERT INTO Adverts (lID, pID, kID, title, description, tennants, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        params = (lID, pID, kID, title, description, tennants, *image_paths)

        cursor.execute(query, params)

        connection.commit()
        current_app.logger.info(f"MySQL status: {cursor.rowcount}")

        cursor.close()
        connection.close()

        return jsonify({"message": "Advert created successfully"}), 201

    else:
        if not session["uID"]: 
            redirect("/")
        else:
            render_template("property.html")
