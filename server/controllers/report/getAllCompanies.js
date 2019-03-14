const { pathOr } = require("ramda");
const { getAllCompanies } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return getAllCompanies({
		reportedById: pathOr(null, ["company", "_id"], profile),
		companyType: pathOr("R", ["company", "meta", "type"], profile),
	})
		.then((reports) => {
			return res.status(200).json(reports);
		})
		.catch((error) => next(error));
};
