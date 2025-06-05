import os
from dotenv import load_dotenv
from flask import Flask, session, redirect
from flask_session import Session

from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})


def create_app():

    
    app = Flask(__name__, instance_relative_config=True)

    load_dotenv()
    SECRET_KEY = os.getenv('SECRET_KEY')
    if (not SECRET_KEY):
        app.logger.error("No SECRET_KEY variable found")
        return None
    
    app.config.from_mapping(
        SECRET_KEY = os.getenv('SECRET_KEY')
    )
    app.config["SESSION_PERMANENT"]       = False 
    app.config["SESSION_TYPE"]            = "filesystem"
    app.config["SESSION_COOKIE_SECURE"]   = True
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = True
    
    Session(app)
    
    from .users.login import login_bp
    app.register_blueprint(login_bp)

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
        
    app.logger.info("Flask app created successfully")
    return app