const helpers = require("./helpers");
const errors = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	return helpers.requestPasswordReset(req.data.body.username)
		.then(() => res.status(200).json({ success: true }))
		.catch(() => next(errors.ObjectValidationFailed));
};
