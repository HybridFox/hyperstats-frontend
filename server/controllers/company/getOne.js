const { getCompanyIdOfUser, getOne } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	return getOne({
		_id: req.data.params.id,
		companyOfUser: getCompanyIdOfUser(req),
		isAdmin: profileHelper.isAdmin(req),
	})
		.then((company) => res.status(200).json(company))
		.catch((error) => next(error));
};
