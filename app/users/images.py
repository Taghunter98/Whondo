from flask import request, current_app
import os
from datetime import datetime

def validate_extention(filename:str):
    """
    The function validates the filename's extention is allowed.

    Args:
        filename (str): Name of uploaded file

    Returns:
        bool: File validation
    """

    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file(file:object, email:str):
    
    if file.filename == '':
        current_app.logger.error("File is missing")
        return False
    if file and validate_extention(file.filename):
        filename = validate_extention(file.filename)
        try:
            file.save(
                os.path.join(current_app.config['UPLOAD_FOLDER'], 
                f"profile/{file.filename}_{datetime.now}_{email}"
            ))
            current_app.logger.info("File stored successfully")
            return True
        except Exception as err:
            current_app.logger.error("Can't store file")
            return False