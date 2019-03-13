const { loginHandler } = require("./helpers");
const profile = require("../../helpers/profile");
const errors = require("../../helpers/errorHandler");

module.exports = async(req, res, next) => {
	try {
		const user = await loginHandler(req.data.body.username, req.data.body.password);

		profile.set(req, user);

		res.status(200).json(profile.get(req));
	} catch (error) {
		next(error);
	}
};
