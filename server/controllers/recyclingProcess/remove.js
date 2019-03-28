const { pathOr } = require("ramda");
const recyclingProcessManager = require("./helpers/recyclingProcessManager");
const reportsManager = require("../report/helpers");
const { REPORT_SORT_OPTIONS, REPORT_STATUS } = require("../report/helpers/const");
const profileHelper = require("../../helpers/profile");

module.exports = (req, res, next) => {
	const processId = req.data.params.id;
	const profile = profileHelper.get(req);

	reportsManager.getAll({
		reportedById: pathOr(null, ["company", "_id"], profile),
		companyType: pathOr("R", ["company", "meta", "type"], profile),
		recyclingProcessId: processId,
		recycler: pathOr(null, ["company", "_id"], profile),
		sortBy: REPORT_SORT_OPTIONS.name.param,
	})
		.then((reports) => {
			// TODO: delete this reports
			const reportsToDelete = reports.filter(report => report.meta.status === REPORT_STATUS.SAVED);
			console.log(reportsToDelete);
		})
		.catch((error) => next(error));

	recyclingProcessManager.remove(processId)
		.then(() => {
			res.status(204).send();
		}, next);
};
