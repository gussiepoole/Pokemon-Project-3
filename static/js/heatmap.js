var url = "http://127.0.0.1:5000/map_data";

// Create map and add tile layer
var myMap = L.map("map", {
  center: [36.89511, 56.03637],
  zoom: 4
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function (data) {
  
  //console.log(data.features[2].geometry.coordinates);

  // Create markers
  data.features.forEach(function(feature) {
    var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(myMap);
  });

  // Create heat map
  var heatArray = [];
  for (var i = 0; i < data.features.length; i++) {
    var location = data.features[i].geometry.coordinates;
    console.log(location);
    heatArray.push([parseFloat(location[1]), parseFloat(location[0])]);
    }
  

  console.log("heatArray",heatArray);
  var heat = L.heatLayer(heatArray, {
    radius: 50,
    blur: 35
  }).addTo(myMap);
});





