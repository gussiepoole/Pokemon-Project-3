console.log("charts.js")

var selector = d3.select("#selPokemon");

d3.csv("/static/data/pokemon.csv").then(function (data) {
  // console.log("cities")
  // console.log(cities)

  pokemon_array = []

  for (i = 0; i < data.length; i++) {
    pokemon = data[i]["Pokemon name"];

    if (pokemon_array.indexOf(pokemon) === -1) {
      pokemon_array.push(pokemon)
    }
  }

  pokemon_array.sort();

  selector
    .append("option")
    .text("Select a pokemon")
    .property("value", "");

  pokemon_array.forEach((name) => {
    selector
      .append("option")
      .text(name)
      .property("value", name);
  });
})

function optionChanged(selected_pokemon) {
  console.log("selected_pokemon=", selected_pokemon);

  d3.csv("/static/data/pokemon.csv").then(function (data) {
    console.log("data")
    console.log(data)

    var tbody = d3.select("tbody");

    tbody.html("");

    for (i = 0; i < data.length; i++) {
      if (selected_pokemon == data[i]["Pokemon name"]) {
        let row = tbody.append("tr");
        let cell = row.append("td");
        cell.text(data[i]["Pokemon name"]);
        cell = row.append("td");
        cell.text(data[i]["Main ability"]);
        cell = row.append("td");
        cell.text(data[i]["Type of Move"]);
        cell = row.append("td");
        cell.text(data[i]["Fighting type"]);
        cell = row.append("td");
        cell.text(data[i]["Attack"]);
        cell = row.append("td");
        cell.text(data[i]["Defense"]);
        cell = row.append("td");
        cell.text(data[i]["Growth Rate"]);
        cell = row.append("td");
        cell.text(data[i]["Region"]);
        cell = row.append("td");
        cell.text(data[i]["Height"]);
        cell = row.append("td");
        cell.text(data[i]["Weight"]);
      }
    }
  })

}


d3.csv("/static/data/pokemon.csv").then(function (data) {
  console.log("data")
  console.log(data)

  var tbody = d3.select("tbody");

  tbody.html("");

  for (i = 0; i < data.length; i++) {
    let row = tbody.append("tr");
    let cell = row.append("td");
    cell.text(data[i]["Pokemon name"]);
    cell = row.append("td");
    cell.text(data[i]["Main ability"]);
    cell = row.append("td");
    cell.text(data[i]["Type of Move"]);
    cell = row.append("td");
    cell.text(data[i]["Fighting type"]);
    cell = row.append("td");
    cell.text(data[i]["Attack"]);
    cell = row.append("td");
    cell.text(data[i]["Defense"]);
    cell = row.append("td");
    cell.text(data[i]["Growth Rate"]);
    cell = row.append("td");
    cell.text(data[i]["Region"]);
    cell = row.append("td");
    cell.text(data[i]["Height"]);
    cell = row.append("td");
    cell.text(data[i]["Weight"]);
  }
})






