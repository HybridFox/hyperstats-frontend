const profileHelper = require("../../helpers/profile");

module.exports = (req, res) => {
	profileHelper.unset(req);

	return res.status(201).send();
};
