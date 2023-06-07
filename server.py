from flask import Flask, request, jsonify, Response, render_template, send_from_directory, send_file
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='build', template_folder="build/templates")
app.config['DEBUG'] = True

@app.route("/wishes")
def wishes():
    og_description="Coming soon."
    page_title="Wishes!!!!!!!"
    meta_description="The Wishes page."
    og_url="https://thinkpeace.app/wishes"
    og_image="https://www.thinkpeace.app/comingsoon.gif"
    pin = request.args.get('pin')
    theme = request.args.get('theme')
    r = requests.get('http://think-peace.herokuapp.com/wishes')
    wishes = r.json()
    wishes[0].get('_id')

    return render_template("wishes.html",
      REACT_APP_GOOGLE_API_KEY = os.getenv('REACT_APP_GOOGLE_API_KEY'),
      pin=pin, theme=theme, og_description=og_description, page_title=page_title, og_image=og_image, meta_description=meta_description, og_url=og_url)

@app.route("/")
@app.route("/artists")
@app.route("/contribute")
@app.route("/about")
@app.route("/wish")
def index():
    return app.send_static_file('index.html')

@app.route("/themes/<path:path>")
def themes(path=None):
    return send_from_directory('public/themes', path)

app.run(port=3000)
