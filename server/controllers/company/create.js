const { getCompanyIdOfUser, create } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	let companyOfUser;

	if (!profileHelper.isAdmin(req)) {
		companyOfUser = getCompanyIdOfUser(req);
	}

	return create({ companyOfUser, company: req.data.body })
		.then((company) => res.status(201).json(company))
		.catch((error) => next(error));
};
