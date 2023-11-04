const router = require("express").Router({ mergeParams: true })
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

// request route handling for /theaters route
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router