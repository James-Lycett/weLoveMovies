const router = require("express").Router({ mergeParams: true })
const methodNotAllowed = require("../errors/methodNotAllowed")

// just a welcome message and url for use instructions so the landing page doesn't just say "path not found"
function welcome(req, res, next) {
    const message = "Welcome to the weLoveMovies API! Instructions for use can be found in the readMe on github: https://github.com/James-Lycett/weLoveMovies`" 
    res.json(message)
}

// request route handling for no path
router.route("/")
    .get(welcome)
    .all(methodNotAllowed)

module.exports = router