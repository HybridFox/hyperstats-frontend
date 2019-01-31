const updateCompany = require("./helpers/updateCompany");
const getCompanyIdOfUser = require("./helpers/getCompanyIdOfUser");
const ResponseError = require("../../helpers/errors/responseError");

module.exports = (req, res, next) => {
	const companyOfUser = getCompanyIdOfUser(req);

	if (!companyOfUser) {
		next(new ResponseError({ type: 400, msg: "User has no owner company" }));
	}

	return updateCompany({ _id: req.data.params.id, companyOfUser: companyOfUser, update: req.data.body })
		.then((company) => res.status(200).json(company))
		.catch((error) => next(error));
};
