"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    images.py
Author:      Josh Bassett
Date:        06/06/2025
Version:     1.0

Description: Provides functions for image validation and storage. 
"""

from flask import request, current_app
import os
from datetime import datetime

def validate_extention(filename:str) -> bool:
    """
    The function validates the filename's extention is allowed.

    Args:
        filename (str): Name of uploaded file

    Returns:
        bool: File validation
    """

    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file(file:object, email:str) -> str:
    """
    The function handles file upload and creates a directory for the user's
    profile image within /Uploads/Profile/.

    Args:
        file (object): Uploaded file
        email (str): User's email address

    Returns:
        str: File path
    """
    
    if file.filename == '':
        current_app.logger.error("File is missing")
        return None
    
    if file and validate_extention(file.filename):
        try:
            date:str = str(datetime.now())[:10]
            path = os.path.join(f"{current_app.config['UPLOAD_FOLDER']}/Profile", email)
            
            if not os.path.exists(path):
                os.mkdir(path)
            
            file_path:str = f"{date}_{email}_{file.filename}"

            file.save(
                os.path.join(path, file_path))

            current_app.logger.info("File stored successfully")
            return file_path
        
        except Exception as err:
            current_app.logger.error("Can't store file")
            return None