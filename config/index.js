// Config
// ---
// Project-wide configuration

const { mergeDeepLeft } = require("ramda");

module.exports = mergeDeepLeft(
	require("./general"),
	require(`./env/${process.env.NODE_ENV.toLowerCase()}.js`)
);
