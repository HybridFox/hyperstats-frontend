const { pathOr } = require("ramda");
const { update } = require("./helpers");
const profileHelper = require("../../helpers/profile");
const { DEFAULT_REPORT_STATE } = require("./helpers/const");

module.exports = (req, res, next) => {
	const profile = profileHelper.get(req);

	return update({
		_id: req.data.params.id,
		reportedById: pathOr(null, ["company", "_id"], profile),
		updatedData: pathOr({}, ["data", "body", "data"], req),
		updatedStatus: pathOr("SAVED", ["data", "body", "meta", "status"], req),
		updatedState: pathOr(DEFAULT_REPORT_STATE, ["data", "body", "meta", "state"], req),
	})
		.then((reports) => res.status(200).json(reports))
		.catch((error) => next(error));
};
