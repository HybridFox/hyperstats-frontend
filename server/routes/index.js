const glob = require("glob");
const express = require("express");
const fallback = require("./fallback");

const router = express.Router();

glob.sync("./routes/**/!(index|fallback).js", {
	absolute: true,
}).forEach(route => {
	require(route)(router);
});

// Fallback route
router.route(["/", "/*"]).all(fallback);

module.exports = router;
