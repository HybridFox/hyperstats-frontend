const { pathOr } = require("ramda");
const recyclingProcessManager = require("./helpers/recyclingProcessManager");
const profileHelper = require("../../helpers/profile");

module.exports = async(req, res, next) => {
	const profile = await profileHelper.get(req);

	recyclingProcessManager
		.getAll({ companyId: pathOr(null, ["company", "_id"], profile) })
		.then((data) => res.status(200).json(data), next);
};
