const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// CRUDL request functions for /reviews route

/*  
    Checks if review with given reviewId exists in records,
    otherwise returns 404 "Review cannot be found."
*/
async function reviewExists(req, res, next) {
    const { reviewId } = req.params
    const data = await service.read(reviewId)
    if (data) {
        res.locals.review = data        
       next()
    } else {
         next({
            status: 404,
            message: "Review cannot be found."
        })
    }
}

/*
    GET request to /reviews/:reviewId responds with a single 
    review with the given id
*/
function read(req, res, next) {
    const data = res.locals.review
    res.json({ data })
}

/* 
    PUT request to /reviews/:reviewId updates the review with 
    the given id and returns the whole review
*/
async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,        
    }    
    const data = await service.update(updatedReview)
    res.json({data})    
}

/* 
    DELETE request to /reviews/:reviewId deletes the review with 
    the given id and returns status 204
*/
async function destroy(req, res, next) {
    const review_id = res.locals.review.review_id
    await service.destroy(review_id)
    res.sendStatus(204)
}

module.exports = {
    read: [
        asyncErrorBoundary(reviewExists),
        read
    ],
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ]
}