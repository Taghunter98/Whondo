import os
from dotenv import load_dotenv
from flask import Flask, session, redirect

def create_app():
    
    app = Flask(__name__, instance_relative_config=True)

    load_dotenv()
    SECRET_KEY = os.getenv('SECRET_KEY')
    if (not SECRET_KEY):
        print("No SECRET_KEY variable found")
        return None
    app.config.from_mapping(
        SECRET_KEY = os.getenv('SECRET_KEY')
    )
    app.config["SESSION_PERMANENT"] = False 
    app.config["SESSION_TYPE"] = "filesystem"
    
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

    return app