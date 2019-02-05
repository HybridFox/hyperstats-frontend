const { getCompanyIdOfUser, get } = require("./helpers");

module.exports = (req, res, next) => {
	return get({ type: req.data.params.type, companyOfUser: getCompanyIdOfUser(req) })
		.then((companies) => res.status(200).json(companies))
		.catch((error) => next(error));
};
