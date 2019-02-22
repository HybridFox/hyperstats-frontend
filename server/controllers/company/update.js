const { getCompanyIdOfUser, update } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	let companyOfUser;

	if (!profileHelper.isAdmin(req)) {
		companyOfUser = getCompanyIdOfUser(req);
	}

	return update({ _id: req.data.params.id, companyOfUser, update: req.data.body })
		.then((company) => res.status(200).json(company))
		.catch((error) => next(error));
};
