from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
import pandas as pd
app = Flask(__name__)
engine = create_engine("sqlite:///Pokemon_data.sqlite")
print(engine)

df = pd.read_sql("Select * from Pokemon", con=engine, index_col=None)
print("\n================================\n")
df.to_csv('static/data/pokemon.csv', index=False)
df1 = pd.read_csv("static/data/pokemon.csv", )
print(df1.head(2))
print("\n================================\n")

#df = pd.read_sql("Select * from Pokemon",engine)
# print(df)
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
# Save references to each table
#Pokemon_table = Base.classes.pokemon
#session = Session(engine)
#variable = session.query(Pokemon_table).first()
# print(variable)


@app.route("/")
def home():
    print("\n============= /Welcome to home page =============\n")

    return render_template("index.html")

# @app.route("/")
# def home():
#     string = "You are home"
#     return string


@app.route("/map_data")
def connection():
    session = Session(bind=engine)
    execute_string = "select * from Pokemon"
    results = engine.connect().execute(text(execute_string)).fetchall()
    session.close()
    geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [str(lon), str(lat)],
                },
                "properties": {
                    "pokemon_name": str(name),
                    "weight": str(weight),
                    "fighting_type": str(type),
                    "height": str(height),
                    "region": str(region),
                    "Main_ability": str(fighting_type),
                    "attack": str(attack),
                    "defence": str(defence),
                    "growth_rate": str(growth_rate),
                    "ability": str(ability)
                },
            } for name, type, growth_rate, ability, height, weight, attack, defence, fighting_type,  region, lat, lon, gender in results]
    }
    return (geojson)


#     return render_template("index.html")
@app.route("/map")
def display_map():
    return render_template("map_test.html")


@app.route("/heatmap")
def display_heatmap():
    return render_template("heatmap.html")


@app.route("/map_select")
def display_select():
    return render_template("map_select.html")


@app.route("/gus_map")
def g_map():
    return render_template("gus_map.html")


# @app.route("/attack")
# def display_attack():
#     return render_template("/attack.html")

@app.route("/attack")
def viz():
    return render_template("attack.html")


@app.route("/data")
def data():
    f = open("static/data/pokemon.csv", "r")
    i = 0
    pokemon_data = []
    for x in f:
        datal = x.split(',')
        if i > 0:
            pokemon_data.append({
                                "name": datal[1],
                                "type": datal[2],
                                "defence": datal[7],
                                "weight": datal[5],
                                "attack": datal[6]
                                })
        i += 1
    f.close()
    return(jsonify(pokemon_data))


@app.route("/growth_rate")
def display_growth():
    return render_template("/growth_rate.html")


@app.route("/chart_select")
def display_selectchart():
    return render_template("/chart_select.html")


@app.route("/Pokemon_data")
def pokemon_growth():
    session = Session(bind=engine)
    execute_string = "select * from Pokemon"

    Pokemon = engine.connect().execute(text(execute_string)).fetchall()

    growth_rate = []
    for row in Pokemon:
        growth_rate.append({
            "Pokemon name": row[0],
            "Growth rate": row[2],
            "Main ability": row[3],
            "Attack": row[7],
            "Defense": row[6]
        })
    session.close()
    # Return dictionary as a JSON file for JS processing
    return(jsonify(growth_rate))


@app.route("/charts")
def chart():
    print("\n============= /pie_chart =============\n")

    return render_template("charts.html")


@app.route("/a", methods=[])
def landing():
    if request.method == 'POST':
        name_pokemon = request.form.get('pokeName')
        result = query(name_pokemon)
        return render_template("", result=result)
    return render_template("index.html")


def query():
    return 0


# @app.route("/submit")
# def submit():
#     print("submit")
if __name__ == '__main__':
    app.run(debug=True)
