const profileHelper = require("../../helpers/profile");

module.exports = async(req, res) => {
	await profileHelper.unset(req);

	return res.status(201).send();
};
