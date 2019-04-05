const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const ReportModel = require("../../../../models/report");
const updateLog = require("../../../auditLogs/helpers/update");
const { REPORT_STATUS } = require("../../../report/helpers/const");

const errors = require("../../../../helpers/errorHandler");

module.exports = (recyclingProcessId, user) => ReportModel.findOne({ "data.information.recyclingProcess": recyclingProcessId, "meta.status": REPORT_STATUS.FILED }).exec()
	.then((response) => {
		if (response) {
			throw errors.Forbidden;
		}

		return;
	})
	.then(() => RecyclingProcessModel.updateOne({ _id: recyclingProcessId, "meta.deleted": false }, { $set: { "meta.deleted": true } }).exec())
	.then((response) => {
		if (!response.nModified) {
			throw errors.ProcessNotFound;
		}

		return;
	})
	.then(() => Promise.all([
		ReportModel.find({ "data.information.recyclingProcess": recyclingProcessId }, { "data.information.name": 1 }).lean().exec(),
		ReportModel.updateMany({ "data.information.recyclingProcess": recyclingProcessId }, { $set: { "meta.deleted": true } }).exec(),
	]))
	.then(([reports]) => reports.forEach(report => updateLog({ report, user, status: "deleted" })));
