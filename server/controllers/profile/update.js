const profileHelper = require("../../helpers/profile");
const helpers = require("./helpers");
const { prop, compose, curry, __, tap } = require("ramda");

module.exports = async(req, res, next) => {
	try {
		const user = await compose(
			curry(helpers.updateUserProfile)(__, req.body),
			prop("email"),
			profileHelper.get
		)(req);

		profileHelper.set(req, user);

		return res.status(200).json(profileHelper.get(req));
	} catch (error) {
		return next(error);
	}
};
