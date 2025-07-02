"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    advert.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Serves a Blueprint API for creating a new advert.
"""

from flask import Blueprint, request, jsonify, session, redirect

advert_bp = Blueprint("advert_bp", __name__)

@advert_bp.route("/advert/new", methods=["POST", "GET"])
def advert():
    if request.method == "POST":
        if not session['uID']:
            redirect("/")
        
        

    else:
        redirect("/")