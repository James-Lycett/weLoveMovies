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
        .orderBy("m.movie_id")
}

module.exports = {
    list,
    listIsShowing,
    listIsNotShowing,
}