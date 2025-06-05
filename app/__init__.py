import os
from dotenv import load_dotenv
from flask import Flask, session, redirect, has_request_context, request
from flask_session import Session
from flask.logging import default_handler
import logging
from logging.config import dictConfig

def create_app():
    """
    A function that configures logging, creates the Flask config and builds
    the app.

    App is created with instance relative config set to True, tells the app
    that the cofig files are relative to the instance folder.

    Log file path is located and then converted into an absolute path (e.g.
    /home/ec2-user/Whondo/app.log). Directory name containing file is
    fetched and .. moves up one directory to Whondo/ the root directory.

    Log file path is 

    """

    app = Flask(__name__, instance_relative_config=True)

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
        app.logger.info(f"Reqyest: {request.method} {request.path} from {request.remote_addr}")
    
    @app.after_request
    def log_response(response):
        app.logger.info(f"Response: {response.status} for {request.method} {request.path}")
        return response

    # Base directory for Whondo - currently just says hello world :)
    @app.route('/')
    def hello():
        if (session.get("uID")):
            session_id = session.get('uID')
            return f"Hello, World!\nUser logged in id: {session_id}"
        else:
            return "Hello World!"
    
    @app.route('/login')
    def check_session():
        if (session.get("uID")):
            return redirect("/")
        else:
            return "Please log in"
        
    return app

class RequestFormatter(logging.Formatter):
    def format(self, record):
        if has_request_context():
            record.url = request.url
            record.remote_addr = request.remote_addr
        else:
            record.url = None
            record.remote_addr = None

        return super().format(record)