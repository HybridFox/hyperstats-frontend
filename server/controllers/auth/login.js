const { loginHandler } = require("./helpers");
const errors = require("../../helpers/errorHandler");
const profile = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	try {
		const user = await loginHandler(req.body.email, req.body.password);

		profile.set(req, user);

		res.status(200).json(profile.get(req));
	} catch (error) {
		return next({ message: errors.ItemNotFound });
	}
};
