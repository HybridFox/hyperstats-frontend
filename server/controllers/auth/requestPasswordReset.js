const helpers = require("./helpers");

module.exports = (req, res, next) => {
	return helpers.requestPasswordReset(req.data.body.username)
		.then(() => res.status(200).json({ success: true }))
		.catch((error) => next(error));
};
