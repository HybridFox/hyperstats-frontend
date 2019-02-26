const { loginHandler } = require("./helpers");
const errors = require("../../helpers/errorHandler");
const profile = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	try {
		const user = await loginHandler(req.data.body.email, req.data.body.password);

		if (user.meta.validation.isValidated) {
			profile.set(req, user);
		}

		res.status(200).json(profile.get(req));
	} catch (error) {
		return next({ message: errors.ItemNotFound });
	}
};
