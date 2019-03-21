const { pathOr } = require("ramda");
const { getAllCompanies } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return getAllCompanies({
		getType: req.data.query.type,
		reportedById: pathOr(null, ["company", "_id"], profile),
		companyType: pathOr("R", ["company", "meta", "type"], profile),
	})
		.then((companies) => res.status(200).json(companies))
		.catch((error) => next(error));
};
