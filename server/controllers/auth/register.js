const { registerHandler } = require("./helpers");
const errors = require("../../helpers/errorHandler");

module.exports = async(req, res, next) => {
	try {
		const user = await registerHandler(req.body);

		if (!user) {
			throw new Error("No user");
		}

		req.session.profile = user;

		res.status(200).json({ success: true });
	} catch (error) {
		return next({ message: errors.ItemNotFound });
	}
};
