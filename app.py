from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import data
from pymongo import MongoClient
import requests
import pandas as pd

client = MongoClient('127.0.0.1', 27017)
db_name = 'kiva data'

# connect to the database
db = client[db_name]

loans = db.loans

fields = "name, loan_amount, "

pages = list(range(0, 1000))
pages_list = pages[0:1000:100]

base_url = 'https://api.kivaws.org/graphql?query='

graphql_query = "{lend {loans (id: ) {totalCount values {name loanAmount image {url(presetSize: small)}activity {name}geocode {latitude longitude country {isoCode name}}lenders(limit: 0) {totalCount}}}}}"

response = requests.get(base_url+ graphql_query).json()

def get_games(url_base, num_pages, fields, collection):

    base_url = 'https://api.kivaws.org/graphql?query='

    graphql_query = "{lend {loans (id: ) {totalCount values {name loanAmount image {url(presetSize: small)}activity {name}geocode {latitude longitude country {isoCode name}}lenders(limit: 0) {totalCount}}}}}"

    for page in num_pages:
        url = url_
        print(url)
        response = requests.get(url, headers=headers).json()
        print(response)
        video_games = response['results']
        for i in video_games:
            collection.insert_one(i)