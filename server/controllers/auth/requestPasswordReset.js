const helpers = require("./helpers");
const errors = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	return helpers.requestPasswordReset(req.body.email)
		.then(() => res.status(200).json({ success: true }))
		.catch(() => next({ message: errors.ObjectValidationFailed }));
};
