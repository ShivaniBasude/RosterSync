from flask import Flask, jsonify
from flask_cors import CORS

from topology import get_topological_order
from scheduler import get_scheduler_data

app = Flask(__name__)

CORS(app)



@app.route("/graph")

def graph():

    services, edges, order = get_topological_order()

    return jsonify({

        "services": services,
        "edges": edges,
        "order": order

    })



@app.route("/scheduler")

def scheduler():

    data = get_scheduler_data()

    return jsonify(data)



if __name__ == "__main__":

    app.run(debug=True)