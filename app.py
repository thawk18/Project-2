# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/x_app")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    # @TODO: YOUR CODE HERE!
    x_data = mongo.db.collection.find_one()

    # Return template and data
    return render_template("index.html", x=x_data)



    # Run the API function and save the results to a variable
    api_data = data.data_info()

    # Update the Mongo database using update and upsert=True
    # @TODO: YOUR CODE HERE!
    mongo.db.collection.update({}, page_data, upsert=True)

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
