const { pathOr } = require("ramda");
const { getAllLogs } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return getAllLogs(pathOr(null, ["company", "_id"], profile))
		.then((logs) => res.status(200).json(logs))
		.catch((error) => next(error));
};
