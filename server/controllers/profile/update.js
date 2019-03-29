const profileHelper = require("../../helpers/profile");
const helpers = require("./helpers");
const { prop } = require("ramda");

module.exports = async(req, res, next) => {
	try {
		const profile = await profileHelper.get(req);
		const user = await helpers.updateUserProfile(prop("email", profile), req.body);

		profileHelper.set(req, user);

		return res.status(200).json(await profileHelper.get(req));
	} catch (error) {
		return next(error);
	}
};
