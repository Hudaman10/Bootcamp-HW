// API key
const API_KEY = "pk.eyJ1IjoiZGFydGFuaW9uIiwiYSI6ImNqbThjbHFqczNrcjkzcG10cHpoaWF4aWUifQ.GwBz1hO0sY2QE8bXq9pSRg";

// Creating map object
var map = L.map("map", {
  center: [40.09, -105.71],
  zoom: 5
});


// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


function Color(magnitude) {
   var color = "";
   if (magnitude> 5) {color = "#ea2c2c";}
   else if (magnitude > 4) {color = "#ea822c";}
   else if (magnitude > 3) {color = "#ee9c00";}
   else if (magnitude > 2) {color = "#eecc00";}
   else if (magnitude > 1) {color = "#d4ee00";}
   else {color = "#98ee00";};
   return color;}

// Perform a GET request to the query URL
d3.json(link, function(data) {

L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
        	radius: feature.properties.mag * 5,
        	fillColor: Color(feature.properties.mag),
    		color: "black",
    		weight: 1,
    		opacity: 1,
    		fillOpacity: 0.8});
    }
}).addTo(map);
});
