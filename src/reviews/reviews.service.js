const knex = require("../db/connection")

// CRUDL handling for database table "reviews"
// database written in postgresQL

// selects a single review by review_id
async function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .then((createdRecords) => createdRecords[0])
}

// used in update function to get records that .update won't return
async function readCritic(updatedCritic_id) {
    return knex("critics as c")
        .select("*")
        .where({ "c.critic_id": updatedCritic_id })
        .then((createdRecords) => createdRecords[0])
}

/* 
    Updates review with provided data and nests critic data
    inside of returned [updated] review object
*/
async function update(updatedReview) {
    const critic = await readCritic(updatedReview.critic_id)
    
    await knex("reviews as r")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview);

    const reviewDataAfterUpdate = 
    await knex("reviews as r")
        .select("*")         
        .where({
            review_id: updatedReview.review_id,          
        })
        .first();
        
    const combinedData = {
        ...reviewDataAfterUpdate,
        critic: {
            ...critic
        }
    }
   return combinedData
}


// Deletes review with given reviewId
function destroy(review_id) {
    return knex("reviews")
        .where({ review_id: review_id})
        .del()
}


module.exports = {
    read,
    update,
    destroy
}