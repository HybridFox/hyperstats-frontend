const dataMiddleware = require("../middleware/data");
// const validationPresets = require("../helpers/validation/presets");
const Errors = require("../helpers/errorHandler");
const reportController = require("../controllers/report");
const reportValidations = require("../controllers/report/validations");
const authMiddleware = require("../middleware/auth");

module.exports = (router) => {
	router.use("/companies*", authMiddleware.isLoggedIn);

	router.route("/reports")
		.post(
			dataMiddleware.copy,
			dataMiddleware.validate("body", reportValidations.report, Errors.ObjectValidationFailed),
			reportController.create
		);
};
