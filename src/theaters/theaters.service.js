const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")


// theater table database CRUDL handler functions

/* GETS all movies shown in all theaters and returns an object
{
    theater_id: [
        {movie}, 
        {movie},...
    ], 
    theater_id: [
        {movie}, 
        {movie},...
    ],...
}
*/
function listMoviesByTheater() {
    return knex("movies as m")
        .select("m.*", "t.theater_id", "mt.is_showing")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .where({ "mt.is_showing": true })
        .orderBy("t.theater_id")
        .then((results) => {
            const moviesByTheater = {}
            /*  creates a key for each theater_id and
                pushes movies into an array at the key that matches their theater_id
            */
            results.forEach((movie) => {
                const id = movie.theater_id
                if (!moviesByTheater[id]) {
                    moviesByTheater[id] = []
                }
                moviesByTheater[id].push(movie)
            })
            return moviesByTheater
        })
}

/* GETS all theaters and inserts a movies property into each with the matching array of movies
[
    {...theaterDetails,
         movies: [
            {movie}, 
            {movie}, 
            {movie},... 
        ]
    }, 
    {...theaterDetails, 
        movies: [
            {movie}, 
            {movie}, 
            {movie},...
        ]
    }
]
*/
async function list() {
    const moviesObject = await listMoviesByTheater()
    return knex("theaters as t")
        .select("*")
        .then((results) => {             
            results.forEach((theater) => {
                const id = theater.theater_id.toString()                
                theater.movies = moviesObject[id]                
            })
            return results
        })        
}

module.exports = {
    list,
}