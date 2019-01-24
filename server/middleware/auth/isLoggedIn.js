const profileHelper = require("../../helpers/profile");
const ResponseErrors = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	if (!profileHelper.get(req)) {
		return next({ message: ResponseErrors.Forbidden });
	}

	return next();
};
