from flask import Blueprint, send_from_directory, current_app

image_bp = Blueprint("image_bp", __name__)

@image_bp.route("/uploads/<path>")
def download_file():
    path = "/home/ec2-user/Uploads/Profile/bassettjosh397@gmail.com/2025-06-07_bassettjosh397@gmail.com_wilson.jpg"
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], path=path, as_attachment=True)