const recyclingProcessManager = require("./helpers/recyclingProcessManager");
const { pathOr } = require("ramda");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	recyclingProcessManager.create({
		process: pathOr({}, ["data", "body", "data"], req),
		companyId: pathOr(null, ["company", "_id"], profile),
	}).then((data) => res.status(201).json(data), next);
};
