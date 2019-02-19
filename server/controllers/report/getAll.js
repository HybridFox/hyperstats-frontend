const { pathOr } = require("ramda");
const { getAll } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return getAll({ reportedById: pathOr(null, ["company", "_id"], profile) })
		.then((reports) => res.status(200).json(reports))
		.catch((error) => next(error));
};
