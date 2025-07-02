"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    keywords.py
Author:      Josh Bassett
Date:        02/07/2025
Version:     1.0

Description: Provides a function to store keywords in the database.
"""

def store_keywords(keywords: list) -> bool:
    query = []
    for key in keywords:
        query.append(key)

    query_str = f"INSERT INTO Keywords ({", ".join(key for key in query)}) VALUES({", ".join("True" for i in range(len(keywords)))});"
    print(query_str)

keys = ["flat", "pet_friendly", "furnished"]
store_keywords(keys)