const glob = require("glob");
const express = require("express");

const router = express.Router();

glob.sync("./server/routes/**/!(index).js", {
	absolute: true,
}).forEach(route => {
	require(route)(router);
});

// Fallback route
router.route(["/", "/*"]).all((req, res) => {
	res.status(404).json({
		err: "Not Found.",
	});
});

module.exports = router;
