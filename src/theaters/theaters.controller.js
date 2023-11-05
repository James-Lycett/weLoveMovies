const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// CRUDL request functions for /theaterss route

// GET request to /theaters returns a list of all theaters
async function list(req, res, next) {
    const data = await service.list()
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list)
}