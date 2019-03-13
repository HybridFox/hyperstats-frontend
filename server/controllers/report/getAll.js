const { pathOr } = require("ramda");
const { getAll } = require("./helpers");
const profileHelper = require("../../helpers/profile");
const { REPORT_SORT_OPTIONS } = require("./helpers/const");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return getAll({
		reportedById: pathOr(null, ["company", "_id"], profile),
		companyType: pathOr("R", ["company", "meta", "type"], profile),
		recyclingProcessId: pathOr(null, ["data", "query", "recycling-process"], req),
		sortBy: pathOr(REPORT_SORT_OPTIONS.name.param, ["data", "query", "sort"], req),
	})
		.then((reports) => res.status(200).json(reports))
		.catch((error) => next(error));
};
