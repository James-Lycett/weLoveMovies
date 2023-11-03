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
        .select("*")    
        .distinctOn("m.movie_id")   
        .where({ "mt.is_showing": true})
        .orderBy("m.movie_id")
}

function listIsNotShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")        
        .select("*")
        .distinctOn("m.movie_id")
        .where({ is_showing: false})
        .orderBy("m.movie_id")
}

module.exports = {
    list,
    listIsShowing,
    listIsNotShowing,
}