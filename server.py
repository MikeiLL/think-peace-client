from flask import Flask, request, jsonify, Response

app = Flask(__name__, static_url_path='', static_folder='build')
app.config['DEBUG'] = True


@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/testing")
def testing():
    return "Hello there, world"


app.run(port=3000)
