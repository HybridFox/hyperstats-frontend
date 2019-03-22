const profileHelper = require("../../helpers/profile");
const errors = require("../../helpers/errorHandler");

module.exports = async(req, res, next) => {
	if (!await profileHelper.get(req)) {
		return next({ message: errors.Forbidden });
	}

	return next();
};
