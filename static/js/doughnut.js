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


function spinnerLoadAnimation() {
    pokemonContainer.innerHTML = `<div id="spinnerDiv"></div>`;
}




//Detects the type of Pokemon, and uses a symbol according to it

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
                                label: "Pokemon Count", //change this
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
                            text: 'Growth Rate' //change this
                        }
                    }
                });
            });
    } catch (error) {
        console.log(error);
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
                <span>Weight: ${pokemonData.weight}</span>
                <span>Height: ${pokemonData.height}</span>
                <span>ID: ${pokemonData.id}</span>
                <span>Base Experience: ${pokemonData.base_experience}XP</span>
                <span>HP: ${pokemonData.stats[0].base_stat} 
                    <img src="https://img.icons8.com/fluency/48/000000/pixel-heart.png"/>
                </span>
                <span>Attack: ${pokemonData.stats[1].base_stat} 
                    <img src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/48/000000/external-sword-achievements-and-badges-flatart-icons-lineal-color-flatarticons.png"/>
                </span>
                <span>Defense: ${pokemonData.stats[2].base_stat} 
                    <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/48/000000/external-shield-achievements-and-badges-flatart-icons-flat-flatarticons.png"/>
                </span>
            </section>
        </div>
    `;
}




//We listen to the form button
listenToElements('#searchButton', () => {
    spinnerLoadAnimation();
    makeApiRequest(searchBar.value.toLowerCase());
    getDataFromFlask(searchBar.value.toLowerCase());
})