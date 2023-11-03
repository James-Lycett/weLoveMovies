const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// CRUDL request functions

// check if any query params then check if query param is "is_showing"
function validateQueryParams(req, res, next) {
    const methodName = "validateQueryParams"
    //req.log.debug({ __filename, methodName, queryParams: req.query})
    const params = req.query
    if (!params.length) {
        return next()
    } else if (Object.hasOwn(params, "is_showing")) {
        //req.log.trace({ __filename, methodName, valid: true })
        return next()
    } else {
        const message = `Invalid query parameters: ${JSON.stringify(params)} must include "is_showing`
        next({
            status: 400,
            message: message
        })
        //req.log.trace({ __filename, methodName, valid: false})
    }
}

//
async function list(req, res, next) {
    const methodName = "list"    
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
}

module.exports = {
    list: [
        validateQueryParams,
        asyncErrorBoundary(list)
    ]    
}