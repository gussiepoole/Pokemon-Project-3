//Defining the "End-Point"
const pokemonURL = 'https://pokeapi.co/api/v2/';
const pokemonGender = 'https://pokeapi.co/api/v2/gender/';
const pokemonContainer = document.querySelector('#pokemonContainer');
const searchBar = document.querySelector('#pokeName');

const flaskURL = 'http://127.0.0.1:5000/';
const dataThing = 'Pokemon_data';

getDataFromFlask();



/*  ==========  FUNCTIONS ==========   */
function listenToElements(type, callback) {
    document.addEventListener('click', (e) => {
        if (e.target.matches(type)) {
            callback();
        }
    })
}


function spinnerLoadAnimation(){
    console.log("spinnerLoadAnimation")
    
    pokemonContainer.innerHTML = `<div id="spinnerDiv"></div>`;
    console.log(pokemonContainer.innerHTML)
}


//Detects the type of Pokemon, and uses a symbol according to it
function detectType(type) {
    switch (type) {
        case 'fire':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-prettycons-flat-prettycons/48/000000/external-fire-ecology-prettycons-flat-prettycons.png"/>`;
            break;

        case 'electric':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/48/000000/external-thunder-weather-kmg-design-flat-kmg-design.png"/>`;
            break;

        case 'water':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-wanicon-flat-wanicon/48/000000/external-wave-world-oceans-day-wanicon-flat-wanicon.png"/>`;
            break;

        case 'ice':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/48/000000/external-snowflake-weather-vitaliy-gorbachev-flat-vitaly-gorbachev.png"/>`;
            break;

        case 'rock':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/emoji/48/000000/rock-emoji.png"/>`;
            break;

        case 'flying':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/48/000000/external-wind-autumn-wanicon-lineal-color-wanicon.png"/ style="transform: scale(-1)">`;
            break;

        case 'grass':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-wanicon-two-tone-wanicon/48/000000/external-grass-nature-wanicon-two-tone-wanicon.png"/>`;
            break;

        case 'ghost':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/ios/48/000000/ghost--v1.png"/>`;

        case 'bug':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/48/000000/external-bug-gardening-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"/>`;
            break;

        case 'poison':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/ios-filled/48/000000/poison-bottle.png"/>`;
            break;

        case 'ground':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/color/48/000000/ground.png"/>`;
            break;

        case 'dragon':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/color/48/000000/the-dragon-team.png"/>`;
            break;

        case 'steel':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/color/48/000000/steel-i-beam.png"/>`;
            break;

        case 'fightning':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-icongeek26-flat-icongeek26/48/000000/external-boxing-gloves-martial-arts-icongeek26-flat-icongeek26.png"/>`;
            break;

        case 'psychic':
            return `${type.toUpperCase()} <img src="https://img.icons8.com/external-gradient-icons-maxicons/48/000000/external-brain-medical-gradient-gradient-icons-maxicons.png"/>`;
            break;

        default:
            return `${type.toUpperCase()}`;
            break;
    }
}

function getDataFromFlask(filter) {
    try {

        let chartStatus = Chart.getChart("myChart"); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }

        const fetchResponse = fetch(`${flaskURL}${dataThing}`)
            .then(response => response.json())
            .then(response => {
                if(filter)
                    return response.filter(x => x['Pokemon name'] === filter);
                return response;
            })
            .then(
                response => {
                    return response.reduce((acc, current) => {
                        const currentGrowthRate = current['Growth rate'];
                        currentGrowthRate in acc ? acc[currentGrowthRate]++ : acc[currentGrowthRate] = 1;
                        return acc;
                    }, {})
                })
            .then(accumulator => {
                return Object.entries(accumulator)
                .map(([k,v]) => {
                    return {
                    key:k,
                    value:v
                    }
                });
            })
            .then(data => {
                new Chart(document.getElementById("myChart"), {
                    type: 'doughnut',
                    data: {
                        labels: data.map(x => x.key),
                        datasets: [
                            {
                                label: "Animals Count", //change this
                                // backgroundColor: ["#51EAEA", "#FCDDB0",
                                //     "#FF9D76", "#FB3569", "#82CD47"], 
                                data: data.map(x => x.value)
                            }
                        ]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Chart JS Bar Chart Example' //change this
                        }
                    }
                });
            });
    } catch (error) {
        console.log(error);
    }
}


//We make the API request
async function makeApiRequest(pathName) {
    console.log("makeApiRequest")
    console.log(pathName)
    
    if (searchBar.value != '') {
        try {

            const fetchResponse = await fetch(`${pokemonURL}pokemon/${pathName}`)
                .then(response => response.json())
                .then(data => { return data });

            printPokemon(fetchResponse);

        } catch (error) {
            pokemonContainer.innerHTML = '<p>Introduce a correct Pokémon name please!</p>';
        }

    } else {
        pokemonContainer.innerHTML = '<p>Input some data, please!</p>';
    }
}

function printPokemon(pokemonData) {
    console.log(pokemonData);
    pokemonContainer.innerHTML = `
        <div id="pokemonCard">
            <section class="imageContainer">
                <img src="${pokemonData.sprites.front_default}" alt="Pokemon Image not found">
                <img src="${pokemonData.sprites.back_default}" alt="Pokemon Image not found">
            </section>
            <section>
                <h2>${pokemonData.name.toUpperCase()}</h2>
                <h3>${detectType(pokemonData.types[0].type.name)}</h3>
            </section>
        </div>
    `;
}




//We listen to the form button
listenToElements('#searchButton', () => {
    console.log('##searchButton')
    spinnerLoadAnimation();
    makeApiRequest(searchBar.value.toLowerCase());
    getDataFromFlask(searchBar.value.toLowerCase());
})