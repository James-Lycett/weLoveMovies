// Errors caught by validation middleware (next({errorObject})) are sent here to die
function errorHandler(error, req, res, next) {
    const { status = 500, message = "Something went wrong."} = error
    res.status(status).json({ error: message })
}
module.exports = errorHandler