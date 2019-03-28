const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const ReportModel = require("../../../../models/report");
const { REPORT_STATUS } = require("../../../report/helpers/const");

const errors = require("../../../../helpers/errorHandler");

module.exports = (id) => ReportModel.findOne({ "data.information.recyclingProcess": id, "meta.status": REPORT_STATUS.FILED }).exec()
	.then((response) => {
		if (response) {
			throw errors.Forbidden;
		}

		return;
	})
	.then(() => RecyclingProcessModel.updateOne({ _id: id, "meta.deleted": false }, { $set: { "meta.deleted": true } }).exec())
	.then((response) => {
		if (!response.nModified) {
			throw errors.ProcessNotFound;
		}

		return;
	})
	.then(() => ReportModel.updateMany({ "data.information.recyclingProcess": id }, { $set: { "meta.deleted": true } }).exec());

