const Controller = require("../controllers/assets");

module.exports = (router) => {
	router.route("/assets")
		.post(
			...Controller.create,
		);

	router.route("/assets/:id")
		.get(
			Controller.get,
		);
};
