const { getCompanyIdOfUser, getAll } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	return getAll({
		type: req.data.query.type,
		companyOfUser: getCompanyIdOfUser(req),
		isAdmin: profileHelper.isAdmin(req),
	})
		.then((companies) => res.status(200).json(companies))
		.catch((error) => next(error));
};
