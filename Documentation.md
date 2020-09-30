Files required for project
- app.py: to run flask through will trigger data.py to run API (see Web Scraping HW for reference)
- index.html: page will be generated from this file (see Leaflet HW for inspiration)
- data.py: will run through flask when the page is opened. Will use an API to take data from the Kiva website and store it in MongoDB (see Web Scraping HW for reference)
- logic.js: will generate the maps and graphs for the webpage (see Mapping and D3 HW for reference)
- styls.css: will be used to format and style the page as necessary 


File structure
app.py
- set up flask page
- link in Mongo DB


index.html (use bellybutton visualisation or mapping for reference)
- Title of page
- Space for generation of map: clicking on map will transition to new view
- space for visuals: values for visuals will change with any map transitions
- paragraph describing either process of page or breaking down country bio
- include all relevant links to js packages and bootcamp

data.py
- create code that uses API to scrape data from Kiva site
- data includes: location of loan, loan amount and number of loans by country
- the dataset we're looking at only extracts information for the most recent 10,000-15,000 loans
we will be using this data to generate the map and visuals
- store data to MongoDb as a dictionary

logic.js (mapping)
- use mapbox data to set world map as default screen
- use choropeth to allocate different colouration to countries depending on the total number of current loans or the total loan value each country has
- clicking on a country will transition the map to show a map of that specific country. This map will use the location data from the loans to generate markers on the map
- clicking on the markers will show a popup providing basic information for that loan (e.g attributes of borrower, sector)
- will need to include a button/function that returns the map to the default world map view

logic.js (visuals)
- use plotly to create bar/pie charts based on the data selected
- clicking on a country will filter out the data so that the graphs only show the summary for the loans just in that country
- example: breakdown by gender, sector, amount etc
