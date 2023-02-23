//add each map layer to the map

var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var myMap = L.map("map", {
    center: [36.89511, 56.03637],
    zoom: 4,
    layers: [street]
});

let pokemon = new L.LayerGroup();
let pokemonLarge = new L.LayerGroup();

let overlays = {
    "All Pokemons": pokemon,
    "Small Pokemon": pokemonLarge
}


L.control.layers(overlays).addTo(myMap);

// add remaining code here
var legend = L.control({ position: 'bottomright' });



// Use this link to get the GeoJSON data.
var link = "http://127.0.0.1:5000/map_data"


// Perform a GET request to the query URL.
d3.json(link).then(function (data) {
    console.log(data.features);
    // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.
    // 1.
    // Pass the features to a createFeatures() function:
    createFeatures(data.features);
});

// Function to determine marker size
function markerSize(height) {
    return height * 1000;
};

// Function to determine marker color by attack
function chooseColor(attack) {
    if (attack >= 120) return "#5c0304";
    else if (attack < 120 && attack >= 100) return "#ea2c2c";
    else if (attack < 100 && attack >= 80) return "#ea822c";
    else if (attack < 80 && attack >= 60) return "#ee9c00";
    else if (attack < 60 && attack >= 40) return "#eecc00";
    else if (attack < 40 && attack >= 20) return "#98ee00";
    else if (attack < 20 && attack >= 0) return "#d4ee00";
    else return
};

//create map function to store data 
function createFeatures(pokemonData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("Pokemon Name: " + feature.properties.pokemon_name + "<br>Location:<br>" + feature.properties.region + "<br>Type of Move:<br>" + feature.properties.Main_ability);
    }

    // Save the Pokemon data in a variable.
    L.geoJSON(pokemonData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {

            if (feature.properties.height < 20) {
                var markers = {
                    radius: markerSize(3 * feature.properties.height),
                    fillColor: chooseColor(feature.properties.attack),
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    stroke: true,
                    fillOpacity: 0.8
                };
                return L.circle(latlng, markers);
            }
            else { }

        }
    }).addTo(pokemonLarge);
    pokemonLarge.addTo(myMap);

    // Save the Pokemon data in a variable.
    L.geoJSON(pokemonData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {

            var markers = {
                radius: markerSize(3 * feature.properties.height),
                fillColor: chooseColor(feature.properties.attack),
                color: "black",
                weight: 1,
                opacity: 1,
                stroke: true,
                fillOpacity: 0.8
            };
            return L.circle(latlng, markers);
        }
    }).addTo(pokemon);

    pokemon.addTo(myMap);
    
    // add legend to map
    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            attack = [0, 20, 40, 60, 80, 100, 120];

        div.innerHTML += 'Pokemon<br>Attack<br><hr>'

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < attack.length; i++) {
            div.innerHTML +=
                '<i style="background:' + chooseColor(attack[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
                attack[i] + (attack[i + 1] ? '&ndash;' + attack[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);

}

