// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([38.9637, 35.2433], 3);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Create a new marker.
// L.marker([45.52, -122.67]).addTo(myMap);


const url = "/static/data/conversion.json"

d3.json(url).then(function (data){
    data.forEach((val) => console.log(val));
    for (var i=0; i<data.length; i++) {
           
        var lon = parseFloat(data[i]["Longitude"]);
        var lat = parseFloat(data[i]["Latitude"]);
        var popupText = "Pokemon name: " + (data[i]["Pokemon name"]).toUpperCase() + "<br> Pokemon may be found at: (" + data[i]["Latitude"] + ", " + data[i]["Longitude"] + ")"
        console.log(lon+lat+popupText)
        
         var markerLocation = new L.LatLng(lat, lon);
         var icon = L.icon({
           iconUrl: "/static/images/charizard.png",
           // iconUrl: "images/" + data[i]["Pokemon name"] + ".png",
            iconSize: [30, 30],
            iconAnchor: [10, 0],
        });
         var marker = new L.Marker(markerLocation,{icon});
         myMap.addLayer(marker);
     
         marker.bindPopup(popupText);
     
     }

//
})


//   // Add a tile layer.
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(myMap);
  
//   L.marker("45.52", "6.8428").addTo(myMap);

//   d3.json("file:///Users/gussiepoole/UBHM/Project-3/map/conversion.json", createMarkers)
// //   // An array containing each city's name, location, and population
// //   var Pokemon = [{
    
// //   "Pokemon name": "bulbasaur",
// //   "Latitude": "6.8428",
// //   "Longitude": "81.3399"
// // } var newMarker = L.marker(Latitude, Longitude], {

// //   ];
  
// //   // Looping through the pokemon, create one marker for Pokemon, bind a popup containing its name and population, and add it to the map.
// //   for (var i = 0; i < "Pokemon name"; i++) {
// //     var Poke = Pokemon[i];
// //     L.marker(Latitude, Longitude)
// //       .bindPopup(`<h1>${"Pokemon name"}</h1>)
// //       .addTo(myMap);
