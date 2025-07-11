"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    keywords.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Provides a function to store keywords in the database.
"""

from app.database.db_connect import connect


def store_keywords(keywords: list) -> int:
    """
    The function stores the keywords provided in the database and returns the kID.

    Args:
        keywords (list): List of keywords

    Returns:
        int: The keyword ID (kID)
    """
    fields = []
    for key in keywords:
        fields.append(key)

    connection: object = connect()
    cursor: object = connection.cursor()

    query = f"INSERT INTO Keywords ({', '.join(f for f in fields)}) VALUES({', '.join('1' for i in range(len(keywords)))});"

    cursor.execute(query)
    connection.commit()

    kID: int = cursor.lastrowid

    cursor.close()
    connection.close()

    return kID


def delete_keywords(kID: int) -> bool:
    """
    The function deletes a value from the databse and returns the result.

    Args:
        kID (int): The keyword ID

    Returns:
        bool: Result
    """
    query: str = "DELETE FROM Keywords WHERE kID = %s"

    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query, (kID,))
    connection.commit()

    deleted: bool = cursor.rowcount == 1

    cursor.close()
    connection.close()

    return deleted

def reset_keywords(kID: int) -> bool:
    ALL_KEYWORDS: list = [
        "house", "flat", "bungalow", "studio", "bedsit", "maisonette", "shared_house",
        "student_accommodation", "en_suite", "penthouse", "furnished", "unfurnished",
        "bills_included", "all_inclusive", "double_room", "single_room", "balcony", "garden",
        "parking", "pets_allowed", "pet_friendly", "wifi_included", "utilities_included",
        "short_let", "long_let", "no_deposit", "low_deposit", "zero_deposit", "dss_accepted",
        "guarantor_required", "no_guarantor", "student_friendly", "city_centre", "near_university",
        "close_to_station", "bus_route", "zone_1", "zone_2", "zone_3", "zone_4", "cycle_friendly",
        "LGBTQ_friendly", "vegan_household", "non_smoking", "smoking_allowed", "social_house",
        "quiet_house", "wheelchair_accessible", "lift", "ground_floor", "bike_storage"
    ]

    query = f"UPDATE Keywords SET {', '.join(f"{kw} = 0" for kw in ALL_KEYWORDS)} WHERE kID='{kID}';"

    connection: object = connect()
    cursor: object = connection.cursor()

    cursor.execute(query)
    connection.commit()

    reset: bool = cursor.rowcount == 1

    cursor.close()
    connection.close()

    return reset


# def update_keywords(kID: int, keywords: list) -> bool:

#     fields = []
#     for key in keywords:
#         fields.append(key)

#     connection: object = connect()
#     cursor: object = connection.cursor()
    
#     query = f"UPDATE Keywords SET {', '.join(f'{field}=1' for field in fields)};"

#     cursor.execute(query)
#     connection.commit()

#     kID: int = cursor.lastrowid

#     cursor.close()
#     connection.close()

#     return kID