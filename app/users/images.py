"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    images.py
Author:      Josh Bassett
Date:        06/06/2025
Version:     1.0

Description: Provides functions for image validation and storage.
"""

from flask import Blueprint, send_from_directory, request, abort, current_app, jsonify
from datetime import datetime
import os
from dotenv import load_dotenv

from app.database.db_connect import connect

image_bp = Blueprint("image_bp", __name__)
image_purge_bp = Blueprint("image_purge_bp", __name__)


@image_bp.route("/uploads")
def serve_upload():
    """
    The REST API serves imgages from the EC2 Uploads directory.

    Path is checked from the argument (path) value.

    Image path is accessed, if successful the image will be served to the browser,
    else an appropriate error will be returned.

    Returns:
        Response: Served image or appropriate error message
    """

    path: str = request.args.get("path")

    if not path:
        abort(400, description="Missing 'path' query parameter.")

    full_path: str = os.path.join(current_app.config["UPLOAD_FOLDER"], path)

    if not os.path.isfile(full_path):
        abort(404, description="File not found.")

    directory, filename = os.path.split(full_path)

    return send_from_directory(directory, filename)


def validate_extention(filename: str) -> bool:
    """
    The function validates the filename's extention is allowed.

    Args:
        filename (str): Name of uploaded file

    Returns:
        bool: File validation
    """

    ALLOWED_EXTENSIONS: list = {"png", "jpg", "jpeg", "gif"}

    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file(file: object, email: str) -> str:
    """
    The function handles file upload and creates a directory for the user's
    profile image within /Uploads/Profile/.

    Args:
        file (object): Uploaded file
        email (str): User's email address

    Returns:
        str: File path
    """

    if file.filename == "":
        current_app.logger.error("File is missing")
        return None

    if file and validate_extention(file.filename):
        try:
            date: str = str(datetime.now())[:10]
            path: str = os.path.join(
                f"{current_app.config['UPLOAD_FOLDER']}/Profile", email
            )

            if not os.path.exists(path):
                os.mkdir(path)

            file.save(os.path.join(path, f"{date}_{email}_{file.filename}"))

            current_app.logger.info("File stored successfully")
            return f"Profile/{email}/{date}_{email}_{file.filename}"

        except Exception:
            current_app.logger.error("Can't store file")
            return None


@image_purge_bp.route("/images/purge<key>")
def purge():
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    key: str = request.args.get("key")

    if key != API_KEY:
        current_app.logger.warning("Unauthorised API request")
        return jsonify({"error": "Unauthorised request, this will be reported"})

    connection: object = connect()
    cursor: object = connection.cursor()

    query: str = """
        SELECT email from Users;
    """

    cursor.execute(query)

    emails: object = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify({"emails": emails})
