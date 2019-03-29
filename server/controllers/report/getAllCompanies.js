const { pathOr } = require("ramda");
const { getAllCompanies } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	const profile = await profileHelper.get(req);

	return getAllCompanies({
		filterType: req.data.query.type,
		reportedById: pathOr(null, ["company", "_id"], profile),
		companyType: pathOr("R", ["company", "meta", "type"], profile),
	})
		.then((companies) => res.status(200).json(companies))
		.catch((error) => next(error));
};
