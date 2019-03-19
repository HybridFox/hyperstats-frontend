const helpers = require("./helpers");

module.exports = (req, res, next) => {
	return helpers.resetPassword(req.data.body.password, req.data.body.token)
		.then(() => res.status(200).json({ success: true }))
		.catch((error) => next(error));
};
