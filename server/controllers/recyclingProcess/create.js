const recyclingProcessManager = require("./helpers/recyclingProcessManager");
const { pathOr } = require("ramda");
const profileHelper = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	const profile = await profileHelper.get(req);

	recyclingProcessManager.create({
		process: pathOr({}, ["data", "body", "data"], req),
		meta: pathOr({}, ["data", "body", "meta"], req),
		companyId: pathOr(null, ["company", "_id"], profile),
	}).then((data) => res.status(201).json(data), next);
};
