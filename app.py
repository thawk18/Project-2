from flask import (Flask, render_template, redirect, jsonify, request)
from flask_pymongo import PyMongo
from pymongo import MongoClient
import requests
import pandas as pd
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/loans_db"
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
mongo = PyMongo(app)
# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, URI="mongodb://localhost:27017/loans_db")
db = mongo.db.loans_db
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/api")
def api():
    results = db.find()
    loan_list = []
    for x in results:
        name = x['name']
        lat = x['geocode']['latitude']
        lon = x['geocode']['longitude']
        loanAmount = x['loanAmount']
        country = x['geocode']['country']['name']
        isocode = x['geocode']['country']['isoCode']
        lendcount = x['lenders']['totalCount']
        loan_data = {
            "name": name,
            "loan_amount": loanAmount,
            "lat": lat,
            "lon": lon,
            "country": country,
            "isocode": isocode,
            "lender_count": lendcount
        }
        loan_list.append(loan_data)
    # name = x
    # loan_data = {"name" : name}
    return jsonify(loan_list)
if __name__ == "__main__":
    app.run(debug=True)