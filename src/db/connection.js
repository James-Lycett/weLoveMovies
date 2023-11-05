// Loads up the right kind of knex instance for the current node environment
// Defaults to development
const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;
