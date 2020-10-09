from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/loans_db')

db = client.loans_db

print(db.loans_db.find_one()['name'])

# print(x['name'])