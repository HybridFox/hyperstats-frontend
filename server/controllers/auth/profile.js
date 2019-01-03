const profileHelper = require("../../helpers/profile");
const ErrorHandler = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	if (!profile) {
		return next({ message: ErrorHandler.Forbidden });
	}

	return res.status(200).json(profile);
};
