if (process.env.USER || process.env.USERNAME) require("dotenv").config();
const cors = require("cors")
const logger = require("./config/logger")
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")


app.use(logger)
app.use(cors())
app.use(express.json())

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("theaters", theatersRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app;
