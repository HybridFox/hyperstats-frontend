const { pathOr } = require("ramda");
const { getOne } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return getOne({ _id: req.data.params.id, reportedById: pathOr(null, ["company", "_id"], profile) })
		.then((reports) => res.status(200).json(reports))
		.catch((error) => next(error));
};
