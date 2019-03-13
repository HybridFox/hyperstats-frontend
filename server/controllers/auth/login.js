const { loginHandler } = require("./helpers");
const errors = require("../../helpers/errorHandler");
const profile = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	try {
		const user = await loginHandler(req.data.body.username, req.data.body.password);

		profile.set(req, user);

		res.status(200).json(profile.get(req));
	} catch (error) {
		if (error.type === 401) {
			return next({ message: errors.MissingAuthorization });
		}

		return next({ message: errors.ItemNotFound });
	}
};
