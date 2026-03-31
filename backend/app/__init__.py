from flask import Flask, send_from_directory
import os

STATIC_FOLDER = "/app/static"


def create_app():
    app = Flask(__name__)

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve(path):
        if path and os.path.exists(os.path.join(STATIC_FOLDER, path)):
            return send_from_directory(STATIC_FOLDER, path)
        return send_from_directory(STATIC_FOLDER, "index.html")

    return app
