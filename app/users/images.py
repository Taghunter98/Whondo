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
    """
    The function handles file upload

    Args:
        file (object): _description_
        email (str): _description_

    Returns:
        _type_: _description_
    """
    
    if file.filename == '':
        current_app.logger.error("File is missing")
        return False
    
    if file and validate_extention(file.filename):
        try:
            date:str = str(datetime.now())[:10]
            path = os.path.join(f"{current_app.config['UPLOAD_FOLDER']}/Profile", email)
            
            if not os.path.exists(path):
                os.mkdir(path)
            
            file.save(
                os.path.join(path, f"{date}_{email}_{file.filename}"))

            current_app.logger.info("File stored successfully")
            return True
        
        except Exception as err:
            current_app.logger.error("Can't store file")
            return False