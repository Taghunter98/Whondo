from flask import Blueprint
import mysql.connector
import os
from dotenv import load_dotenv
import logging

def connect():
    """
    Simple database connection function, works by fetching enivronment
    variables for the database, then attempting a connection.

    Returns:
        object: Database connection object
    """
    
    try:
        load_dotenv()

        DB_USER  = os.getenv('DB_USER')
        DB_PASS  = os.getenv('DB_PASS')
        DB_HOST  = os.getenv('DB_HOST')
        DATABASE = os.getenv('DATABASE')

        connect = mysql.connector.connect (
            user     = DB_USER,
            password = DB_PASS,
            host     = DB_HOST,
            database = DATABASE
        )
        
        return connect
    except mysql.connector.Error as err:
        logging.error(f"ERROR: {err}")