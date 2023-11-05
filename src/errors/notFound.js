// Ye' olde 404 Not Found error
function notFound(req, res, next) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}` })
}

module.exports = notFound