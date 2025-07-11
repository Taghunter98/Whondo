"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    property_keyword_advert.py
Author:      Josh Bassett
Date:        07/07/2025
Version:     1.0

Description: Provides a helper function to return ID's from PropertyKeywordAdvert.
"""

from flask import jsonify
from app.database.db_connect import connect
from app.property.advert import update_advert
from app.property.keywords import update_keywords, reset_keywords
from app.property.property import update_property


def get_ids(pkaID: int) -> list:
    """
    The helper function returns the ID records from the 3NF table.

    Args:
        pkaID (int): The primary key for the PropertyKeywordAdvert table

    Returns:
        list: List of ID records
    """
    connection: object = connect()
    cursor: object = connection.cursor(dictionary=True)

    query: str = "SELECT pID, kID, adID FROM PropertyKeywordAdvert WHERE pkaID = %s"

    cursor.execute(query, (pkaID,))
    data: list = cursor.fetchall()

    cursor.close()
    connection.close()

    return data


def update_transaction(
    pkaID: int, keywords: list, prop_data: dict, advert_data: dict, image_paths: list
) -> bool:
    ids = get_ids(pkaID)
    if not ids:
        return False

    data = ids[0]
    pID = data["pID"]
    kID = data["kID"]
    adID = data["adID"]

    reset_keywords(kID)
    update_keywords(kID, keywords)
    update_property(prop_data, pID)
    update_advert(advert_data, image_paths, adID)

    return True
