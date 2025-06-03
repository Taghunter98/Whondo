from flask import Blueprint
import mysql.connector

db_connect = Blueprint('connect', __name__)

@db_connect.route('/connect', methods=('GET', 'POST'))
def connect():
    return "TESTING..."