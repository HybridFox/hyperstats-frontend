const getCompany = require("./helpers/getCompany");
const getCompanyIdOfUser = require("./helpers/getCompanyIdOfUser");

module.exports = (req, res, next) => {
	return getCompany({ _id: req.params.id, companyOfUser: getCompanyIdOfUser(req) })
		.then((company) => res.status(200).json(company))
		.catch((error) => next(error));
};
