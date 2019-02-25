const ReportModel = require("../../models/report");
const { mock } = require("../mocks/report");

module.exports.create = async(reportedBy, report = mock) => {
	const newReport = new ReportModel(report);

	newReport.meta.reportingCompany = reportedBy;

	return newReport.save();
};
module.exports.remove = (_id = mock._id) => ReportModel.remove({ _id });
