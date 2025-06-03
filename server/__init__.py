import os
from flask import Flask

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    from .database import connect
    app.register_blueprint(connect.db_connect)

    # Base directory for Whondo - currently just says hello world :)
    @app.route('/')
    def hello():
        return 'Hello, World!'

    return app