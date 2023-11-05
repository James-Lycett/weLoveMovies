# weLoveMovies
weLoveMovies is a REST API designed to serve theater sites with theater and movie information including theater addresses, what movies they are showing, and information about the movies, including reviews.

## How to use weLoveMovies API
### /theaters Route
- The /theaters route currently only accepts GET requests, which will return a list of all theaters

### /movies route
- The /movies route currently only accepts GET requests, which will return a list of all movies.<br>
- GET requests to /movies can have the optional parameter ?is_showing=true to list all movies that are currently showing in theaters or vice versa if ?is_showing=false<br>
- GET requests to /movies/:movieId where movieId is a number corresponding to the movie_id property of a movie will return a single movie with the given id or 404 "Movie cannot be found"<br>
- GET requests to /movies/:movieId/theaters will return all of the theaters where the movie with the given id is showing<br>
- GET requests to /movies/:movieId/reviews will return all of the reviews for the movie with the given id<br>

## Links
The API is currently deployed here: https://welovemovies-backend-ksdj.onrender.com

A demo frontend app that uses the API can be found here: https://github.com/James-Lycett/weLoveMovies-frontend

The demo frontend app can be found deployed here: https://welovemovies-frontend-zsml.onrender.com
