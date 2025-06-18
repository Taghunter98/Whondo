from flask import Blueprint, send_from_directory, current_app, request

image_bp = Blueprint("image_bp", __name__)

@image_bp.route("/uploads/<path>")
def download_file():
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], path=request.args.get['path'], as_attachment=True)