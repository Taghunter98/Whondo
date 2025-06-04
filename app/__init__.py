import os
from flask import Flask

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    from .users.login import login_api
    app.register_blueprint(login_api)

    # Base directory for Whondo - currently just says hello world :)
    @app.route('/')
    def hello():
        return 'Hello, World!'

    return app