const { getCompanyIdOfUser, create } = require("./helpers");

module.exports = (req, res, next) => {
	return create({ companyOfUser: getCompanyIdOfUser(req), company: req.data.body, type: req.data.params.type })
		.then((company) => res.status(201).json(company))
		.catch((error) => next(error));
};
