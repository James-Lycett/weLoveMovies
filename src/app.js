if (process.env.USER) require("dotenv").config();
const cors = require("cors")
const pinoHttp = require("pino-http")
const express = require("express");

const app = express();
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")


app.use(pinoHttp())
app.use(cors())
app.use(express.json())

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("theaters", theatersRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app;
