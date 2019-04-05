const { pathOr } = require("ramda");
const { create } = require("./helpers");
const { createLog } = require("../auditLogs/helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const user = profileHelper.getFull(req);

	return create({
		report: pathOr({}, ["data", "body", "data"], req),
		meta: pathOr({}, ["data", "body", "meta"], req),
		companyId: pathOr(null, ["data", "company", "_id"], user),
	})
		.then((report) => {
			createLog({ item: report, type: "report", user }).then(() => res.status(201).json(report));
		})
		.catch((error) => next(error));
};
