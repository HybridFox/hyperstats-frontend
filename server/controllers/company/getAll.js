const { getAll } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	return getAll({
		type: req.data.query.type,
		companyOfUser: profileHelper.getCompanyOfUser(req),
		isAdmin: profileHelper.isAdmin(req),
	})
		.then((companies) => res.status(200).json(companies))
		.catch((error) => next(error));
};
