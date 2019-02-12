const { getCompanyIdOfUser, getAll } = require("./helpers");

module.exports = (req, res, next) => {
	return getAll({ type: req.data.query.type, companyOfUser: getCompanyIdOfUser(req) })
		.then((companies) => res.status(200).json(companies))
		.catch((error) => next(error));
};
