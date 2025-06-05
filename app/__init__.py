import os
from flask import Flask, session

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    from .users.login import login_bp
    app.register_blueprint(login_bp)

    # Base directory for Whondo - currently just says hello world :)
    @app.route('/')
    def hello():
        return 'Hello, World!'
    
    @app.route('/login')
    def check_session():
        if (session['uID']):
            return f"User {session['uID']} is logged in"
        else:
            return "Please log in"

    return app