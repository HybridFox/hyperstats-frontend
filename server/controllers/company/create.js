const createCompany = require("./helpers/createCompany");
const getCompanyIdOfUser = require("./helpers/getCompanyIdOfUser");

module.exports = (req, res, next) => {
	return createCompany({ companyOfUser: getCompanyIdOfUser(req), company: req.data.body, type: req.data.params.type })
		.then((company) => res.status(201).json(company))
		.catch((error) => next(error));
};
