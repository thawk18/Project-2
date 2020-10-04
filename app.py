from datetime import datetime
import json

print datetime.now()

f = open('loans.json', 'r')
json.load(f)
f.close()

print datetime.now()