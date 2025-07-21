"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    search_api.py
Author:      Josh Bassett
Date:        18/07/2025
Version:     1.0

Description: Provides a REST API for searching and returning properties.
"""

from flask import Blueprint, request, redirect, jsonify, current_app

from app.database.db_connect import connect
from .tokenisation import Parser
from .query_builder import build_query
from .dictionaries import KEYWORDS
from ..utilities.get_landlord import get_landlord_info

search_bp = Blueprint("search_bp", __name__)


@search_bp.route("/search", methods=["POST", "GET"])
def search():
    """
    The REST API returns adverts based on a prompt.

    The request data is validated and the prompt is tokenised and run throught
    the context parser.

    The query is built with the build_query() function and the result is formatted and
    returned.

    Returns:
        Response: Response of successs or appropriate error message
    """
    if request.method == "POST":
        data: object = request.get_json()
        prompt: str = data.get("prompt")

        if not prompt:
            return jsonify({"error": "Prompt not provided"}), 400

        parser = Parser(prompt)
        tokens = parser.tokenise()
        keywords, [location, price, bedrooms, bathrooms] = parser.contextParser(tokens)
        user_keywords: list[str] = [tok.name for tok in keywords]

        if not location:
            return jsonify({"error": "No location provided"}), 400

        connection: object = connect()
        cursor: object = connection.cursor()

        sql, params = build_query(
            keywords=[t.name for t in keywords],
            location=location,
            price=price,
            bedrooms=bedrooms,
            bathrooms=bathrooms,
        )

        cursor.execute(sql, params)
        rows: tuple = cursor.fetchall()

        cursor.close()
        connection.close()

        cols: list = [c[0] for c in cursor.description]
        dict_rows: dict = [dict(zip(cols, row)) for row in rows]
        image_fields = [f"image{i}" for i in range(1, 11)]

        results = []
        for r in dict_rows:
            matched = [kw for kw in user_keywords if r.get(kw)]
            r["score"] = parser.score(user_keywords, matched)

            for kw in KEYWORDS:
                r.pop(kw, None)

            r["matched_keywords"] = matched

            images = [r.pop(f, None) for f in image_fields]

            r["images"] = [img for img in images if img]

            r["landlord_info"] = get_landlord_info(r.get("lID"))
            results.append(r)

        results.sort(key=lambda row: (row["score"], -row["price"]), reverse=True)

        return jsonify(results=results)

    else:
        return redirect("/")
