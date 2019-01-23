const sendToAdmins = require("./helpers/sendToAdmins");

module.exports = (req, res, next) => {
	return sendToAdmins(req.body)
		.then(() => res.status(200).json({ success: true }))
		.catch((error) => next(error));
};
