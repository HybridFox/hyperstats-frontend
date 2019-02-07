const { getCompanyIdOfUser, getOne } = require("./helpers");

module.exports = (req, res, next) => {
	return getOne({ _id: req.data.params.id, companyOfUser: getCompanyIdOfUser(req) })
		.then((company) => res.status(200).json(company))
		.catch((error) => next(error));
};
