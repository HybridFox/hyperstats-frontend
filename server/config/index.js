// Config
// ---
// Project-wide configuration

const merge = require("lodash.merge");

module.exports = merge(
	require("./general"),
	require(`./env/${process.env.NODE_ENV.toLowerCase()}.js`)
);
