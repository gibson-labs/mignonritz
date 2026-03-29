from flask import Flask, send_from_directory
import os


def create_app():
    app = Flask(__name__, static_folder="/app/static", static_url_path="")

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve(path):
        static_folder = app.static_folder or "static"
        if path and os.path.exists(os.path.join(static_folder, path)):
            return send_from_directory(static_folder, path)
        return send_from_directory(static_folder, "index.html")

    return app
