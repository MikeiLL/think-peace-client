from flask import Flask, request, jsonify, Response, render_template
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='build', template_folder="build/templates")
app.config['DEBUG'] = True

@app.route("/sandbox")
def sandbox():
    og_description="Coming soon."
    page_title="Wishes!!!!!!!"
    meta_description="The Wishes page."
    og_url="https://thinkpeace.app/wishes"
    og_image="https://www.thinkpeace.app/comingsoon.gif"
    return render_template("index.html",
      og_description=og_description,
      page_title=page_title,
      og_image=og_image,
      meta_description=meta_description,
      og_url=og_url,
      REACT_APP_GOOGLE_API_KEY=os.environ.get("REACT_APP_GOOGLE_API_KEY")
    )


@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/wishes")
def wishes():
    og_description="Coming soon."
    page_title="Wishes!!!!!!!"
    meta_description="The Wishes page."
    og_url="https://thinkpeace.app/wishes"
    og_image="https://www.thinkpeace.app/comingsoon.gif"
    return render_template("wishes.html",
      og_description=og_description, page_title=page_title, og_image=og_image, meta_description=meta_description, og_url=og_url)


app.run(port=3000)
