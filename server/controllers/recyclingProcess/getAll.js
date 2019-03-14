const { pathOr } = require("ramda");
const recyclingProcessManager = require("./helpers/recyclingProcessManager");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	recyclingProcessManager
		.getAll({ reportedById: pathOr(null, ["company", "_id"], profile) })
		.then((data) => res.status(200).json(data), next);
};
