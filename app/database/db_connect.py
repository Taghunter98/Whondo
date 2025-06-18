"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    db_connect.py
Author:      Josh Bassett
Date:        02/06/2025
Version:     1.0

Description: Provides a connection to the Whondo MySQL database.
"""

from flask import current_app
from dotenv import load_dotenv
import mysql.connector
import os

type Connection = object

def connect() -> Connection:
    """
    The function aattempts a connection to the MySQL database.

    Returns:
        object: Database connection object
    """

    try:
        load_dotenv()

        DB_USER: str = os.getenv("DB_USER")
        DB_PASS: str = os.getenv("DB_PASS")
        DB_HOST: str = os.getenv("DB_HOST")
        DATABASE: str = os.getenv("DATABASE")

        connect: Connection = mysql.connector.connect(
            user=DB_USER, password=DB_PASS, host=DB_HOST, database=DATABASE
        )

        return connect
    except mysql.connector.Error as err:
        current_app.logger.error(err)
