// Creating map object
var myMap = L.map("map", {
  center: [10.0522, 30.2437],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var geoData = "static/data/start.geojson";

var geojson;

// Grab data with d3
d3.json(geoData, function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "fundsLentInCountry",

    // Set color scale
    scale: ["#FFFFFF", "#FF0000"],

    // Number of breaks in step range
    steps: 8,

    // q for quartile, e for equidistant, k for k-means
    mode: "k",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.4
    },

    
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Name: " + feature.properties.name + "<br>Current Nr Loans:<br>" + feature.properties.count+ "<br>Funds Lent in Country:<br>" + "$" + feature.properties.fundsLentInCountry);
      layer.on('mouseover', function () {this.setStyle({'fillColor': '#C0BCB6'})});
      layer.on('mouseout', function() {geojson.resetStyle(this);this.bringToBack();});
      layer.on('click', function () {myMap.fitBounds(layer.getBounds(),{'duration':200});});
      layer.on('click', function () {isocodex = feature.properties.isoCode})
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Total Amount Loaned</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

var jsonurl = "static/data/data.json"

d3.json(jsonurl , function(data) {
  console.log(data[0].name)
  var selectOpt = d3.select("#selDataset");
  for (var i = 0; i < data.length; i++)
    {selectOpt
      .append("option")
      .text(data[i].name)
    };
  }
);


d3.json(jsonurl , function(data) {
  console.log(data[0].name)
  var loanmarker = []
  for (var i = 0; i < data.length; i++) {
    if (data[i].geocode.latitude !==null){
    loanmarker.push(
     L.marker([data[i].geocode.latitude, data[i].geocode.longitude])
     )}}
  var loangroup = L.layerGroup(loanmarker).addTo(myMap)})

  // fetch('https://api.kivaws.org/graphql', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ query: "{lend {loans (sortBy: newest) {totalCount values {name loanAmount gender activity {name} geocode {latitude longitude country {isoCode name}}lenders {totalCount}}}}}" }),
  // })
  //   .then(res => res.json())
  //   .then(data => {console.log(data)
  //   var loans = data.data.lend.loans.values;
  //   var loanmarker = []
  //   for (var i = 0; i < loans.length; i++) {
  //     var loan = data.data.lend.loans.values[i];
  //     if (loan.geocode.latitude !==null){
  //        loanmarker.push(
  //         L.marker([loan.geocode.latitude, loan.geocode.longitude])
  //         )}}
  //     var loangroup = L.layerGroup(loanmarker).addTo(myMap)})
  //     //lend loans values
});

//data variable
var data;

// //Get IDs from the JSON and link to the HTML
// function init() {
//   fetch('https://api.kivaws.org/graphql', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query: "{lend {loans (sortBy: newest) {totalCount values {name loanAmount gender activity {name} geocode {latitude longitude country {isoCode name}}lenders {totalCount}}}}}" }),
//   })
//     .then(res => res.json())
//     .then(data => {console.log(data)
//     var loans = data.data.lend.loans;
// //Link to html
//     var selectOpt = d3.select("#selDataset");
//     loans.values.forEach(value => {
//       selectOpt
//         .append("option")
//         .text(value.name)
//         .attr("value", function() {
//           return value.name;
//         });        
//     });
//   });
// }
// //Fill data in the drop down
// init();

d3.selectAll("#selDataset").on("change", plotFunctions);

//Define functions to plot selected value in the webpage
function plotFunctions() {
  var valueSelect = d3.select("#selDataset").node().value;
  panelPlot(valueSelect);
  Graph (valueSelect);
  gaugeChart (valueSelect);
  console.log(valueSelect)} 

function panelPlot(valueSelect) {
  var filterValue = data.data.lend.loans.values.filter(value => value.name == valueSelect);
  var divValue = d3.select(".panel-body");
  divValue.html("");
  divValue.append("p").text(`Name: ${filterValue.name}`);
  divValue.append("p").text(`Country: ${filterValue.country}`);
  divValue.append("p").text(`Gender: ${filterValue.data.gender}`);
  divValue.append("p").text(`Activity: ${filterValue.activity}`);
  divValue.append("p").text(`Loan Amount: ${filterValue.loanAmount}`);
}

// Create the Trace
var trace = {
  x: ['a','b','c'],
  y: [4,2,3],
  type: "bar",
  orientation: "h"
};

  //arrange in descending order
var layout = {width: 600, height: 300,
  yaxis: {
    autorange: "reversed"
  }
};

    // Create the data array for the plot
var graph = [trace];

    // Plot the chart to be placed in the div tag with id "bar"
Plotly.newPlot("bar", graph, layout);




var datax = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    title: {
      text: "Average Loan per User"
    },
    type: "indicator",

    mode: "gauge",
    gauge: {
      axis: {
        range: [0, 9000],
        tickvals: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
        ticks: "outside"
      },

      steps: [
        { range: [0, 1000], color: "#3a9e3b" },
        { range: [1000, 2000], color: "#46f316" },
        { range: [2000, 3000], color: "#90bf56" },
        { range: [3000, 4000], color: "#b1be54" },
        { range: [4000, 5000], color: "#d9f41e" },
        { range: [5000, 6000], color: "#d4a025" },
        { range: [6000, 7000], color: "#f7af02" },
        { range: [7000, 8000], color: "#b72f0b" },
        { range: [8000, 9000], color: "#6f1c06" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 1,
        value: 6
      }
    }
  }
];
var layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
Plotly.newPlot("gauge", datax, layout);

const url = "/api";
d3.json(url , function(response) {
  console.log(response)
  }
);