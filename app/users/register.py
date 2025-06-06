"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    register.py
Author:      Josh Bassett
Date:        06/06/2025
Version:     1.0

Description: Serves a Blueprint API for registering a new user. 
"""

from flask import Blueprint, request, jsonify, current_app

from app.database.db_connect import connect
from .images import upload_file

register_bp = Blueprint("register_bp", __name__)

@register_bp.route('/register/create', methods = ['POST'])
def register():
    request.get_json()
    email:str       = request.form.get["email"]
    password:str    = request.form.get["password"]
    name:str        = request.form.get["name"]
    surname:str     = request.form.get["surname"]
    age:int         = request.form.get["age"]
    occupation:str  = request.form.get["occupation"]
    bio:str         = request.form.get["bio"]
    profile_picture = request.files.get["file"]

    if (not email or not password or not name or not surname or not age):
        return jsonify({"error" : "Required fields not provided"}), 400
    
    if (profile_picture):
        status:bool = upload_file(profile_picture)
        if (status):
            return jsonify({"message" : "Image uploaded successfully"}), 201
        else:
            return jsonify({"error" : "Image upload failed"}), 500