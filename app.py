from flask import Flask, jsonify
from flask_cors import CORS

from topology import get_graph_data
from scheduler import get_scheduler_data

app = Flask(__name__)

CORS(app)


@app.route("/graph")

def graph():

    data = get_graph_data()

    return jsonify(data)


@app.route("/scheduler")

def scheduler():

    data = get_scheduler_data()

    return jsonify(data)


if __name__ == "__main__":

    app.run(debug=True)
