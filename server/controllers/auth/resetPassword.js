const helpers = require("./helpers");
const errors = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	return helpers.resetPassword(req.body.password, req.body.token)
		.then(() => res.status(200).json({ success: true }))
		.catch(() => next({ message: errors.ObjectValidationFailed }));
};
