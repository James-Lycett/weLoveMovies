const router = require("express").Router({ mergeParams: true })
const methodNotAllowed = require("../errors/methodNotAllowed")

function welcome(req, res, next) {
    const message = "Welcome to the weLoveMovies API! Instructions for use can be found in the readMe on github: https://github.com/James-Lycett/weLoveMovies" 
    res.json(message)
}

router.route("/")
    .get(welcome)
    .all(methodNotAllowed)

module.exports = router