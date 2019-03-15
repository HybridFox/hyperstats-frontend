const profileHelper = require("../../helpers/profile");
const errors = require("../../helpers/errorHandler");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	if (!profile) {
		return next({ message: errors.Forbidden });
	}

	return res.status(200).json(profile);
};
