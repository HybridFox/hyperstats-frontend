const { pathOr } = require("ramda");
const { create } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return create({
		report: pathOr({}, ["data", "body", "data"], req),
		meta: pathOr({}, ["data", "body", "meta"], req),
		companyId: pathOr(null, ["company", "_id"], profile),
	})
		.then((report) => res.status(201).json(report))
		.catch((error) => next(error));
};
