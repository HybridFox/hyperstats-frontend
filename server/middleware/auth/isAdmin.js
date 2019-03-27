const profileHelper = require("../../helpers/profile");
const errors = require("../../helpers/errorHandler");
const { path } = require("ramda");

module.exports = (req, res, next) => {
	if (!path(["meta", "isAdmin"])(profileHelper.getFull(req))) {
		return next({ message: errors.Forbidden });
	}

	return next();
};
