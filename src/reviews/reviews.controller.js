const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// CRUDL request handlers for /theaters route

// validate that record exists
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

// GET request handler
function read(req, res, next) {
    const data = res.locals.review
    res.json({ data })
}

// PUT request handler
async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,        
    }    
    const data = await service.update(updatedReview)
    res.json({data})    
}

// DELETE request handler
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