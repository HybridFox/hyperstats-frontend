const helpers = require("./helpers");
const profile = require("../../helpers/profile");

module.exports = (req, res) => {
	return helpers.verifyHandler(req.data.query.token)
		.then((user) => user ? profile.set(req, user) : null)
		.then(() => res.redirect("/verification-succeeded"))
		.catch(() => res.redirect("/verification-failed"));
};
