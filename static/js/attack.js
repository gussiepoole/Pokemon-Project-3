// Use this link to get the GeoJSON data.
var link = "http://127.0.0.1:5000/data"

// Fetch data for the first 150 Pokémon from the PokeAPI
function init() {
d3.json(link).then(function(data) {
  
    // Extract Attack, Defense, HP, and type data for each Pokémon
   
    // Wait for all data to be fetched
    
      // Define a color scale for each Pokemon type
      const colors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
      };

      // Create a Plotly trace for each Pokémon
      var trace = {
        x: data.map(pokemon => pokemon.attack),
        y: data.map(pokemon => pokemon.defence),
        z: data.map(pokemon => pokemon.weight),
        mode: 'markers',
        type: 'scatter3d',
        marker: {
          size: 5,
          color: data.map(pokemon => colors[pokemon.type]),
        },
      };
      console.log(trace);
      // Create the plot layout
      var layout = {
        scene: {
          xaxis: { title: 'Attack' },
          yaxis: { title: 'Defense' },
          zaxis: { title: 'HP' },
        },
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
        },
        width: 800,
        height: 600,
      };

      // Create the plot
      Plotly.newPlot('plot', [trace], layout); 
    });
    
  };
  init();
 

