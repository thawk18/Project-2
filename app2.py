from pymongo import MongoClient
import requests
import pandas as pd
import pymongo

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

countries = ["AL","BF","BO","BR","CM","CO","CR","EC","FJ","GE","GT","HN","ID","KE","KG","KH","XK","LR","MD","MG","NG","NI","PE","PH","PY","RW","SN","SL","SV","TG","TJ","TL","US","VN"]

# "AL", - albania "BF", - burkina faso "BO", - bolivia "BR", - brazil
# "CM", - cameroon "CO", - colombia "CR", - costa rica "EC", - ecuador 
# "FJ", - fiji "GE", - georgia "GT", - guatemala "HN", - honduras
# "ID", - indonesia "KE", - kenya "KG", - kyrgistan "KH", - cambodja "XK", - kosovo
# "LR", - liberia "MD", - moldova "MG", - madagascar "NG", - nigeria "NI", - nicaragua
# "PE", - peru "PH", - phillipines "PY", - paraguay "RW", - rwanda "SN", - senegal 
# "SL", - sierra leone "SV", - el salvador "TG", - togo "TJ", - tajikistan
# "TL", - timor leste "US", - united states "VN" - vietname

# Declare the database
db = client.loans_db
# Declare the collection
loans = db.loan_db
base_url = 'https://api.kivaws.org/graphql?query='
for country in countries:
        graphql_query = '{lend {loans (filters: {country:"'
        graphql_querynext = '"{totalCount values {name loanAmount image {url(presetSize: small)}activity {name}geocode {latitude longitude country {isoCode name}}lenders {totalCount}... on LoanPartner{partnerName}}}}}'
        response = requests.get(base_url+ graphql_query + country + graphql_querynext).json()
        query = response['data']['lend']['loans']['values']
        for x in query:
                loans.insert_one(x)