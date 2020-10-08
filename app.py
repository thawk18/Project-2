from pymongo import MongoClient
import requests
import pandas as pd
import pymongo

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Declare the database
db = client.loans_db
# Declare the collection
loans = db.loans_db
base_url = 'https://api.kivaws.org/graphql?query='
graphql_query = "{lend {loans (sortBy: newest) {totalCount values {name loanAmount gender activity {name} geocode {latitude longitude country {isoCode name}}lenders {totalCount}}}}}"
response = requests.get(base_url+ graphql_query).json()
query = response['data']['lend']['loans']['values']
for x in query:
        loans.insert_one(x)