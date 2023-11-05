if (process.env.USER || process.env.USERNAME) require("dotenv").config();
const cors = require("cors")
const logger = require("./config/logger")
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")
const homeRouter = require("./home/home.router")
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

// Logger is a pinoHttp instance for http logging
app.use(logger)

// "I hope you brought enough API for everyone"
app.use(cors())

// "You get used to it, I don't even see the code, all I see is blonde, brunette, redhead..."
app.use(express.json())

// Routes
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)
app.use("/", homeRouter)

// Errors
app.use(notFound)
app.use(errorHandler)

module.exports = app;
