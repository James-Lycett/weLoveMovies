const knex = require("../db/connection")

// CRUDL functions for movies database table
// database written in postgresql

function list() {
    return knex("movies")
        .select("*")        
}

function listIsShowing() {
    return knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id")
      .orderBy("m.movie_id");
  }

function listIsNotShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")        
        .select("m.*")        
        .where({ "mt.is_showing": false})
        .groupBy("m.movie_id")
        .orderBy("m.movie_id");
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .then((createdRecords) => createdRecords[0]);
}

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

function readReviews(movieId) {
    return knex("reviews as r")
    .select(
        "r.review_id",
        "r.content",
        "r.score",
        "r.created_at",
        "r.updated_at",
        "r.critic_id",
        "r.movie_id",
        "c.critic_id as critic.critic_id",
        "c.preferred_name as critic.preferred_name",
        "c.surname as critic.surname",
        "c.organization_name as critic.organization_name",
        "c.created_at as critic.created_at",
        "c.updated_at as critic.updated_at"
    )
        .join("critics as c", "c.critic_id", "r.critic_id")
        .where({ "r.movie_id": movieId})
        .then((results) => {
            const data = results.map((row) => {
                return {
                    review_id: row.review_id,
                    content: row.content,
                    score: row.score,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    critic_id: row.critic_id,
                    movie_id: row.movie_id,
                    critic: {
                        critic_id: row['critic.critic_id'],
                        preferred_name: row['critic.preferred_name'],
                        surname: row['critic.surname'],
                        organization_name: row['critic.organization_name'],
                        created_at: row['critic.created_at'],
                        updated_at: row['critic.updated_at'],
                    }
                }
            })
            return data
        })
}

module.exports = {
    list,
    listIsShowing,
    listIsNotShowing,
    read,
    readTheaters,
    readReviews,
}