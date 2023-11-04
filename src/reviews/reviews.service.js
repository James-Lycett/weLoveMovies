const knex = require("../db/connection")

// CRUDL handling for database table "reviews"

async function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .then((createdRecords) => createdRecords[0])
}

async function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then((createdRecords) => createdRecords[0])
}

module.exports = {
    read,
    update
}