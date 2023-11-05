// Requests that find no method handler for their method at a given route are gently scolded
function methodNotAllowed(req, res, next) {
    next({
        status: 405, message: `${req.method} not allowed for ${req.originalUrl}`
    })
}

module.exports = methodNotAllowed