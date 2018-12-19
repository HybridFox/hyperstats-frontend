const glob = require("glob");

module.exports = (app) => {
	glob.sync("./server/routes/**/!(index).js", {
		absolute: true,
	}).forEach(route => {
		require(route)(app);
	});

	// Fallback route
	app.route(["/", "/*"]).all((req, res) => {
		res.status(404).json({
			err: "Not Found.",
		});
	});
};
