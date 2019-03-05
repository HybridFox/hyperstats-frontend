const { registerHandler } = require("./helpers");

module.exports = async(req, res, next) => {
	try {
		const user = await registerHandler(req.data.body);

		req.session.profile = user;

		res.status(200).json({ success: true });
	} catch (error) {
		return next(error);
	}
};
