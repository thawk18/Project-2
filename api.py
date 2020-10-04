# this snippet requires the requests library which can be installed
# via pip with the command: pip install requests
import requests

base_url = 'https://api.kivaws.org/graphql?query='

graphql_query = "{lend {loans {totalCount values {name loanAmount gender activity {name} geocode {latitude longitude country {isoCode name}}lenders {totalCount}}}}}"

r = requests.get(base_url+ graphql_query )

print(r.json())