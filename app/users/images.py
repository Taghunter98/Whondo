"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    images.py
Author:      Josh Bassett
Date:        06/06/2025
Version:     1.0

Description: Provides functions for image validation and storage.
"""

from flask import Blueprint, send_file, request, abort, current_app, jsonify
from flask import current_app
from PIL import Image
from datetime import datetime
import os
import io

from app.database.db_connect import connect
from app.utilities.key_gen import auth_key
from app.security.hashing import check_password

image_bp = Blueprint("image_bp", __name__)
image_purge_bp = Blueprint("image_purge_bp", __name__)


@image_bp.route("/uploads")
def serve_upload():
    """
    The REST API serves imgages from the EC2 Uploads directory.

    Path is checked from the argument (path) value.

    Image path is accessed, if successful the image will be served to the browser,
    else an appropriate error will be returned.

    The image is compressed and reformatted to JPEG for faster load times.

    Returns:
        Response: Served image or appropriate error message
    """

    p: str = request.args.get("path")
    src: str = os.path.join(current_app.config["UPLOAD_FOLDER"], p)
    if not os.path.isfile(src):
        abort(404)

    img = Image.open(src)

    img.thumbnail((800, img.height), Image.LANCZOS)
    buf = io.BytesIO()

    img.save(
        buf,
        format="JPEG",
        optimize=True,
        progressive=True,
        quality=60,     # 60 quality
        subsampling=2,  # 4:2:0 chroma subsampling
        exif=b"",       # strip metadata
    )
    buf.seek(0)
    return send_file(buf, mimetype="image/jpeg")


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


@image_bp.route("/static/icons/<path:filename>")
def serve_icon(filename):
    """
    The REST API serves static icons from nginx.

    Args:
        filename (str): Filename e.g home.svg

    Returns:
        Response: HTTP response
    """
    icons_dir = os.path.join(current_app.root_path, "static", "icons")
    return send_from_directory(icons_dir, filename)


@image_purge_bp.route("/images/purge")
def purge():
    """
    The API returns a list of all emails for purging images for deactivated accounts.

    API key is validated and unauthorised attempts are reported and logged.

    Returns:
        Response: Email list or appropriate error message
    """
    key: str = request.args.get("key")
    uID: str = request.args.get("uID")

    if auth_key(key, uID) is False:
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


def convert_images(images: list, email: str) -> list:
    uploaded_files: list = []
    for file in images:
        uploaded_files.append(upload_file(file, email))

    image_paths: list = []
    for i in range(10):
        if i < len(uploaded_files):
            image_paths.append(uploaded_files[i])
        else:
            image_paths.append(None)

    return image_paths
