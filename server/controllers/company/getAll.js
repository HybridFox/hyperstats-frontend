const getCompanies = require("./helpers/getCompanies");
const getCompanyIdOfUser = require("./helpers/getCompanyIdOfUser");

module.exports = (req, res, next) => {
	return getCompanies({ type: req.data.params.type, companyOfUser: getCompanyIdOfUser(req) })
		.then((companies) => res.status(200).json(companies))
		.catch((error) => next(error));
};
