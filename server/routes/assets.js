const AuthMiddleware = require("../middleware/auth");
const DataMiddleware = require("../middleware/data");
const Errors = require("../helpers/errorHandler");
const Validations = require("../controllers/assets/validations");
const Controller = require("../controllers/assets");

module.exports = (router) => {
	router.route("/assets")
		.post(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			// can't validate multipart with joi
			...Controller.create,
		);

	router.route("/assets/:id")
		.get(
			AuthMiddleware.isLoggedIn,
			DataMiddleware.copy,
			DataMiddleware.validate("params", Validations.byId, Errors.ObjectValidationFailed),
			DataMiddleware.validate("query", Validations.query, Errors.ObjectValidationFailed),
			Controller.get,
		);
};
