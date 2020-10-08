# this snippet requires the requests library which can be installed
# via pip with the command: pip install requests
import requests
# base_url = 'https://api.kivaws.org/graphql?query='
# graphql_query = "{lend {loans(limit: 20) {totalCount values {name loanAmount image {url(presetSize: small)}activity {name}geocode {country {isoCode name}}lenders(limit: 0) {totalCount}... on LoanPartner {partnerName}}}}}"​
# r = requests.get(base_url+ graphql_query )
# print(r.json())


base_url = 'https://api.kivaws.org/graphql?query='

graphql_query = {lend {loans (filters: {country:"GH"}) {totalCount values {name loanAmount gender raisedDate activity {name} geocode {latitude longitude country {isoCode name}} lenders {totalCount}}}}}

# graphql_query = "{lend {loan (id:202304) {name loanAmount geocode {country{name}}}}}"

response = requests.get(base_url+ graphql_query).json()

# query = response['data']['lend']['loans']['values']

print(response)