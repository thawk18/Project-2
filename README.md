# Project-2

Kiva Loan Visualisation

Brief: Kiva is a company that links up entrepreneurs in developing countries with loan providers from around the world. Using the data that the website has from current and previous loans we will provide am interactive map that shows the location and attributes of the loans. This will be paired with a graph that shows summary statistics for the filtered data.

Inspiration
Kiva already has a number of community developed apps available through its website. Looking through them we found Kiva Lens which allows you to filter through loans based on a variety of factors as well as showing real time numbers for loans on the system. Whilst we're not looking to create something to that extent, it shows that the data is available to provide the end result that we're looking for.

Dataset:
You can access the Kiva data through an API or by downloading a csv file of their data. We're planning on using API calls to extract the data from the site, storing it in MongoDB for future use. As a fall back we are planning to process the data from the csv files into an SQL database. 
Key Data to look at:
- location
- value of loan
- number of investors
- repayment history (y/n)
- sector of loan
- borrower attributes (age, gender etc)
- lender attributes (if available, perhaps looking to group by user) 

The Structure:
Through Flask an app will be run that generates the webpage that runs the mapping and graphing functions. Taking the data stored on MongoDB a default map will be generated on the page with a graph/visualisation below it. Through dropdowns/forms as well as clicking the user will be able to transition the map to different countries. This will filter to  data which will change the map and visualisations accordingly. 





