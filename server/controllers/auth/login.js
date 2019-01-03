const { loginHandler } = require("./helpers");
const errors = require("../../helpers/errorHandler");

module.exports = async(req, res, next) => {
	try {
		const user = await loginHandler(req.body.email, req.body.password);

		if (!user) {
			throw new Error("No user found");
		}

		req.session.profile = user;

		res.status(200).json({ success: true });
	} catch (error) {
		return next({ message: errors.ItemNotFound });
	}
};
