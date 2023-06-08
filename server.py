from flask import Flask, request, jsonify, Response, render_template, send_from_directory, send_file
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='build', template_folder="build/templates")
app.config['DEBUG'] = True

@app.route("/wishes")
def wishes():
    og_description="Activate your own peace today, then give it away. Do it again tomorrow. Peace is fragile; we need to find ways to activate it every day. "
    page_title="Think Peace | Activate your own peace today. Then give it away."
    og_url="wishes"
    og_image="thinkpeacebanner1200x630.png"
    og_title="Here is a wish for you!"
    pin = request.args.get('pin')
    theme = request.args.get('theme') or 'prototype'
    hashTag = None
    if (pin is not None):
      wish = requests.get('http://think-peace.herokuapp.com/wishes?pin=' + pin).json()
      hashTag = wish.get('hashTag')[1:]

    if (hashTag is not None):
      og_title="Here is a wish for #" + hashTag + ' on Think Peace.'
      if (os.path.exists('build/themes/' + theme + '/images/og/' + hashTag.lower() + '.png')):
        # maybe eventually we can dynamically build share files
        # for now, allow artist to upload their own share files
        # per theme.
        og_image="themes/" + theme + "/images/og/" + hashTag.lower() + ".png"
      elif (os.path.exists('build/themes/prototype/images/og/' + hashTag.lower() + '.png')):
        og_image="themes/prototype/images/og/" + hashTag.lower() + ".png"

    return render_template("wishes.html",
      REACT_APP_GOOGLE_API_KEY = os.getenv('REACT_APP_GOOGLE_API_KEY'),
      pin=pin, og_title=og_title, theme=theme, og_description=og_description, page_title=page_title, og_image=og_image, meta_description=og_description, og_url=og_url)

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

if (__name__ == "__main__"):
    app.run(port=3000)
