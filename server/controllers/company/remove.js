const removeCompany = require("./helpers/removeCompany");
const getCompanyIdOfUser = require("./helpers/getCompanyIdOfUser");

module.exports = (req, res, next) => {
	return removeCompany({ _id: req.data.params.id, companyOfUser: getCompanyIdOfUser(req) })
		.then(() => res.status(204).send())
		.catch((error) => next(error));
};
