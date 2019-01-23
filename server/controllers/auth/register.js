const { registerHandler } = require("./helpers");
const errors = require("../../helpers/errorHandler");

module.exports = async(req, res, next) => {
	try {
		const user = await registerHandler(req.body);

		req.session.profile = user;

		res.status(200).json({ success: true });
	} catch (error) {
		return next({ message: errors.ObjectValidationFailed });
	}
};
