"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    __init__.py
Author:      Josh Bassett
Date:        02/06/2025
Version:     1.0

Description: Creates a Flask app instance and sets up logging.
"""

import os
from dotenv import load_dotenv
from flask import Flask, session, redirect, has_request_context, request
from flask_session import Session
from flask.logging import default_handler
from werkzeug.middleware.proxy_fix import ProxyFix
import logging
from logging.config import dictConfig

def create_app():
    """
    A function that configures logging, creates the Flask config and builds
    the app.

    App is created with instance relative config set to True, tells the app
    that the cofig files are relative to the instance folder.

    Flask app is configured with NGINX reverse proxy, so ProxyFix is used to
    provide accurate ip addresses for logging purposes.

    Log file path is defined and 'app.log' is created if not already present.

    Log file config is setup, default formatter provides statndard logging
    output, special request logging format is defined in the RequestFormatter
    class which is taken from Flask's documentation. The handlers are setup to
    define where the logs are written, wsgi sends logs to Flask/Werkzeug output
    the INFO logs are output to 'app.log' in the root directory. Root logger
    sets up global logging for the Flask app, all log messages are sent to 

    Log file formatter to handle HTTP requests is setup with RequestFormatter class.

    Default handler is set to the new HTTP request handler style.

    SECRET_KEY is found and verified in the environment variable.

    Flask app config is setup to handle sessions, the config handles:
        - Sessions are active whilst the browser is open
        - Cookie data is stored on the server
        - Sessions are encrypted
        - HTTPS only for cookies

    Session is started with the Flask app.

    Bluprints are imported and registered.

    Logging before and after logs the incomming request with correct ip addresses,
    request method and response.

    The root directory '/' is served .
    """

    app = Flask(__name__, instance_relative_config=True)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for = 1)

    log_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app.log')

    dictConfig({
        'version': 1,
        'formatters': {
            'default': {
                'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
            },
            'request': {
                '()': RequestFormatter,
                'format': '[%(asctime)s] %(remote_addr)s requested %(url)s\n%(levelname)s in %(module)s: %(message)s',
            }
        },
        'handlers': {
            'wsgi': {
                'class': 'logging.StreamHandler',
                'stream': 'ext://flask.logging.wsgi_errors_stream',
                'formatter': 'default'
            },
            'file': {
                'class': 'logging.FileHandler',
                'filename': log_file_path,
                'formatter': 'request',
                'level': 'INFO'
            },
        },
        'root': {
            'level': 'INFO',
            'handlers': ['wsgi', 'file']
        }
    })

    formatter = RequestFormatter(
        '[%(asctime)s] %(remote_addr)s requested %(url)s\n'
        '%(levelname)s in %(module)s: %(message)s'
    )

    default_handler.setFormatter(formatter)

    load_dotenv()

    SECRET_KEY = os.getenv('SECRET_KEY')
    if (not SECRET_KEY):
        logging.error("No SECRET_KEY variable found")
        return None
    
    app.config.from_mapping(
        SECRET_KEY = os.getenv('SECRET_KEY')
    )
    app.config["SESSION_PERMANENT"]       = False 
    app.config["SESSION_TYPE"]            = "filesystem"
    app.config["SESSION_COOKIE_SECURE"]   = True
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    # app.config["SESSION_COOKIE_SAMESITE"] = True
    
    Session(app)
    
    from .users.login import login_bp

    app.register_blueprint(login_bp)

    @app.before_request
    def log_request():
    
        app.logger.info(f"Request: {request.method} {request.path} from {get_client_ip()}")
    
    @app.after_request
    def log_response(response):
        
        app.logger.info(f"Response: {response.status} for {request.method} {request.path}")
        return response

    @app.route('/')
    def hello():
        if (session.get("uID")):
            session_id = session.get('uID')
            return f"Hello, World!\nUser logged in id: {session_id}"
        else:
            return "Hello World!"
        
    return app

def get_client_ip() -> str:
    
    return request.headers.get('CF-Connecting-IP', request.remote_addr)

class RequestFormatter(logging.Formatter):
    """
    A class that creates a formatter for HTTP requests.

    Args:
        logging (object): Formatter object for logs
    """

    def format(self, record:object) -> str:
        """
        A function that configures a formatter for HTTP requests.

        If request has context, then the url and address are set.
        Otherwise they are set to None.

        Args:
            record (object): Request object containing data

        Returns:
            formatter object: Logger entry   
        """

        if has_request_context():
            record.url = request.url
            record.remote_addr = request.remote_addr
        else:
            record.url = None
            record.remote_addr = None

        return super().format(record)