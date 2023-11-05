const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")


// CRUDL handling for database table "theaters"
// database written in postgresQL

/*
    Selects all theaters, references "movies_theaters" table for movies showing
    at each theater, and nests each theater's movies in a movies property
*/
function list() {
    return knex("theaters as t")
        .select("t.*", "m.*", "mt.is_showing", "mt.theater_id as mtheater_id")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .where({ "mt.is_showing": true })
        .then((results) => {
            const reduceMovies = reduceProperties("theater_id", {
                movie_id: ["movies", null, "movie_id"],
                title: ["movies", null, "title"],
                runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
                rating: ["movies", null, "rating"],
                description: ["movies", null, "description"],
                image_url: ["movies", null, "image_url"],
                created_at: ["movies", null, "created_at"],
                is_showing: ["movies", null, "is_showing"],
                mtheater_id: ["movies", null, "theater_id"]
            })
            const data = reduceMovies(results)
            return data
        })
}

module.exports = {
    list,
}