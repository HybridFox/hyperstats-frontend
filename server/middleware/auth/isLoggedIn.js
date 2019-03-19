const profileHelper = require("../../helpers/profile");
const errors = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	if (!profileHelper.get(req)) {
		return next({ message: errors.Forbidden });
	}

	return next();
};
