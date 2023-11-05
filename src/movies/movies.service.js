const knex = require("../db/connection")

// CRUDL handling for database table "movies"
// database written in postgresQL

// Selects all movies
function list() {
    return knex("movies")
        .select("*")        
}

// Selects all movies where is_showing=true, references "movies_theaters" table
function listIsShowing() {
    return knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id")
      .orderBy("m.movie_id");
}

// Selects all movies where is_showing=false, references "movies_theaters" table
function listIsNotShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")        
        .select("m.*")        
        .where({ "mt.is_showing": false})
        .groupBy("m.movie_id")
        .orderBy("m.movie_id");
}

// Selects a single movie by movieId
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .then((createdRecords) => createdRecords[0]);
}

// Selects all theaters where a single movie by movieId is showing
function readTheaters(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "mt.is_showing", "m.movie_id")
        .where({
            "mt.is_showing": true,
            "mt.movie_id": movieId
        })        
        .orderBy("t.theater_id")
}

/*
    Selects all reviews for a single movie by movieId and nests
    critic data in a "critic" property
*/
async function readReviews(movieId) {
    const reviews = await knex("reviews as r")
        .select("*")
        .where({ "r.movie_id": movieId });
    
    const critics = await knex("critics as c")
        .select("*");

    const combinedData = reviews.map((review) => {
        const critic = critics.find((critic) => critic.critic_id === review.critic_id)
        const formattedReview = {
             ...review,
            critic: {
                ...critic
            }
        }
        return formattedReview
    })
    return combinedData
}

module.exports = {
    list,
    listIsShowing,
    listIsNotShowing,
    read,
    readTheaters,
    readReviews,
}