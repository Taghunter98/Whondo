"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    advert.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Serves a Blueprint API for creating a new advert.
"""

from flask import (
    Blueprint,
    request,
    jsonify,
    session,
    redirect,
    current_app,
    render_template,
)
import json

from app.utilities.auth_lid import auth_landlord
from app.database.db_connect import connect
from app.users.images import  convert_images
from app.property.keywords import store_keywords
from app.property.property import create_property
from app.property.advert import create_advert

advert_bp = Blueprint("advert_bp", __name__)
delete_ad_bp = Blueprint("delete_ad_bp", __name__)

@advert_bp.route("/advert/new", methods=["POST", "GET"])
def advert():
    """
    The REST API creates a new advert in the database.

    Function first authenticates landlords via the session email variable, then if authenticated
    the request data is collected and validated.

    The images are stored and a list of the paths is returned to be stored.

    The Property data, Keyword data and Advert data are stored and primary keys collected.

    The full advert is stored in PropertyKeywordAdvert with each respective key.


    Returns:
        Response: Response of successs or appropriate error message
    """
    if request.method == "POST":
        if not session.get("email"):
            redirect("/")

        title: str = request.form.get("title")
        price: int = int(request.form.get("price"))
        description: str = request.form.get("description")
        keywords_raw: bytes = request.form.get("keywords")
        tennants: int = int(request.form.get("tennants"))
        images: list = request.files.getlist("images")

        keywords: list = json.loads(keywords_raw)

        if not title or not description or not keywords or not images:
            return jsonify({"error": "Required fields are not provided"}), 400

        email: str = session.get("email")
        lID: int = auth_landlord(email)

        prop_data: dict = {
            "propType": request.form.get("propType"),
            "bedrooms": request.form.get("bedrooms"),
            "bathrooms": request.form.get("bathrooms"),
            "name": request.form.get("name"),
            "street": request.form.get("street"),
            "town": request.form.get("town"),
            "county": request.form.get("county"),
            "postcode": request.form.get("postcode"),
        }

        image_paths: list = convert_images(images, email)

        advert_data: dict = {
            "title": title,
            "price": price,
            "description": description,
            "tennants": tennants,
        }

        connection: object = connect()
        cursor: object = connection.cursor()

        kID: int = store_keywords(keywords)
        pID: int = create_property(prop_data)
        adID: int = create_advert(advert_data, image_paths)

        if not kID or not pID or not adID:
            return jsonify({"error": "Keyword, Property or Advert upload failed"}), 400

        query = """
        INSERT INTO PropertyKeywordAdvert (lID, pID, kID, adID)
        VALUES (%s, %s, %s, %s)
        """

        cursor.execute(query, (lID, pID, kID, adID))

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Advert created successfully"}), 201

    else:
        if session.get("uID") and auth_landlord(session.get("email")):
            return render_template("property.html")
        else:
            return redirect("/")


@delete_ad_bp.route("/advert/delete", methods=["POST", "GET"])
def delete_ad():
    if request.method == "POST":
        if not session.get("uID") and auth_landlord(session.get("email")):
            return jsonify({"error": "not logged in or unauthorised"})
        
        pkaID: int = request.args.get("pkaID")
        lID: int = auth_landlord(session.get("email"))
        
        if not pkaID:
            return jsonify({"error": "pkaID not provided"}), 400
        
       

        

    else:
        return redirect("/")