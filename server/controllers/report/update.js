const { pathOr } = require("ramda");
const { update } = require("./helpers");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return update({
		_id: req.data.params.id,
		reportedById: pathOr(null, ["company", "_id"], profile),
		updatedData: pathOr({}, ["data", "body", "data"], req),
		updatedStatus: pathOr("SAVED", ["data", "body", "meta", "status"], req),
	})
		.then((reports) => res.status(200).json(reports))
		.catch((error) => next(error));
};
