from flask import Blueprint
import mysql.connector
import os
from dotenv import load_dotenv

def connect_to_db():
    load_dotenv()
    cnx = mysql.connector.connect (
        user=os.getenv('DB_USER'),
        password= os.getenv('DB_PASS'),
        host=os.getenv('HOST'),
        database= os.getenv('DATABASE')
    )

    if (cnx):
        print("Connection Successful")
    else:
        print("Connection failed")
    cnx.close()

connect_to_db()

# db_connect = Blueprint('connect', __name__)

# @db_connect.route('/connect', methods=('GET', 'POST'))
# def connect():
#     return "TESTING..."