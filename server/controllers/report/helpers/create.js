const ReportModel = require("../../../models/report");

module.exports = async(report = {}) => {
	const newReport = new ReportModel({ data: report });

	await newReport.save();

	return newReport.toObject();
};
