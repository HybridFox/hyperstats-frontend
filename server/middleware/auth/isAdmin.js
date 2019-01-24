const profileHelper = require("../../helpers/profile");
const ResponseErrors = require("../../helpers/errorHandler");
const { path } = require("ramda");

module.exports = (req, res, next) => {
	if (!path(["meta", "isAdmin"])(profileHelper.getFull(req))) {
		return next({ message: ResponseErrors.Forbidden });
	}

	return next();
};
