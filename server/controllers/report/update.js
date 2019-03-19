const { pathOr } = require("ramda");
const { update } = require("./helpers");
const { updateLog } = require("../auditLogs/helpers");
const profileHelper = require("../../helpers/profile");
const { DEFAULT_REPORT_STATE, REPORT_STATUS } = require("./helpers/const");

module.exports = (req, res, next) => {
	const user = profileHelper.getFull(req);

	return update({
		_id: req.data.params.id,
		reportedById: pathOr(null, ["data", "company", "_id"], user),
		updatedData: pathOr({}, ["data", "body", "data"], req),
		updatedStatus: pathOr("SAVED", ["data", "body", "meta", "status"], req),
		updatedState: pathOr(DEFAULT_REPORT_STATE, ["data", "body", "meta", "state"], req),
	})
		.then((report) => {
			updateLog({
				report,
				user,
				isFiled: pathOr(REPORT_STATUS.SAVED, ["meta", "status"], report) === REPORT_STATUS.FILED,
			})
				.then(() => res.status(200).json(report))
				.catch((error) => next(error));
		})
		.catch((error) => next(error));
};
