// Fetch data for the first 150 Pokémon from the PokeAPI
fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
  .then(response => response.json())
  .then(data => {
    // Extract Attack, Defense, HP, and type data for each Pokémon
    const pokemonData = data.results.map((pokemon, index) => {
      return fetch(pokemon.url)
        .then(response => response.json())
        .then(data => ({
          Attack: data.stats[1].base_stat,
          Defense: data.stats[2].base_stat,
          HP: data.stats[0].base_stat,
          Type: data.types[0].type.name,
        }));
    });

    // Wait for all data to be fetched
    Promise.all(pokemonData).then(data => {
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
      const trace = {
        x: data.map(pokemon => pokemon.Attack),
        y: data.map(pokemon => pokemon.Defense),
        z: data.map(pokemon => pokemon.HP),
        mode: 'markers',
        type: 'scatter3d',
        marker: {
          size: 5,
          color: data.map(pokemon => colors[pokemon.Type]),
        },
      };

      // Create the plot layout
      const layout = {
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
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

