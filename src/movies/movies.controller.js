const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// CRUDL request functions

/*
    check if any query params then check if query param is 
    "is_showing"
*/
function validateQueryParams(req, res, next) {
    const methodName = "validateQueryParams"
    req.log.debug({ __filename, methodName, queryParams: req.query})
    const params = req.query
    if (!params.length) {
        return next()
    } else if (Object.hasOwn(params, "is_showing")) {
        req.log.trace({ __filename, methodName, valid: true })
        return next()
    } else {
        const message = `Invalid query parameters: ${JSON.stringify(params)} must include "is_showing`
        next({
            status: 400,
            message: message
        })
        req.log.trace({ __filename, methodName, valid: false})
    }
}
/*
    checks is_showing query param and responds with filtered 
    results or, if no param, responds with all movies
*/
async function list(req, res, next) {    
    const methodName = "list"
    req.log.debug({ __filename, methodName })
    const is_showing = req.query.is_showing
    if (is_showing === "true") {
        const data = await service.listIsShowing()         
        res.json({ data })
    } else if (is_showing === "false") {
        const data = await service.listIsNotShowing()        
        res.json({ data })
    } else {
        const data = await service.list()
        res.json({ data })
    }
    req.log.trace({ __filename, methodName, return: true })
}

/*
    Checks if movie with given movieId exists in records, 
    otherwise returns an error
*/
async function movieExists(req, res, next) {
    const methodName = "movieExists"
    req.log.debug({ __filename, methodName, params: req.params})
    const { movieId } = req.params
    const movie = await service.read(movieId)
    if (movie) {
        req.log.debug({ __filename, methodName, valid: true })
        res.locals.movie = movie
        return next()
    } else {
        next({
            status: 404,
            message: "Movie cannot be found."
        })
    }
    req.log.trace({ __filename, methodName, valid: false})
}

/*
    GET request to /movies/:movieId responds with a single 
    movie with the given id
*/
async function read(req, res, next) {
    const methodName = "read"
    const data = res.locals.movie
    res.json({ data })
    req.log.trace({ __filename, methodName, resBodyData: data})
}

/*
    GET request to /movies/:movieId/theaters responds with 
    a list of theaters playing a single movie with the 
    given id
*/
 async function readTheaters(req, res, next) {
    const methodName = "readTheaters"
    req.log.debug({ __filename, methodName, params: req.params })
    const movieId = res.locals.movie.movie_id
    const data = await service.readTheaters(movieId)
    res.json({ data })
}

/* 
    GET request to /movies/:movieId/theaters responds with 
    a list of reviews for a given movie by id, including a
    critic property with all the critic's info
*/
async function readReviews(req, res, next) {
    const methodName = "readReviews"
    req.log.debug({ __filename, methodName, params: req.params })
    const movieId = res.locals.movie.movie_id
    const data = await service.readReviews(movieId)
    res.json({ data })
}

module.exports = {
    list: [
        validateQueryParams,
        asyncErrorBoundary(list)
    ],
    read: [
        asyncErrorBoundary(movieExists),
        read
    ],
    readTheaters: [
        asyncErrorBoundary(movieExists), 
        asyncErrorBoundary(readTheaters)
    ],
    readReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(readReviews)
    ]
}