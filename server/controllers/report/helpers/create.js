const ReportModel = require("../../../models/report");

module.exports = async(report = {}, companyId = null) => {
	const newReport = new ReportModel({
		data: report,
		meta: { reportingCompany: companyId },
	});

	await newReport.save();

	return newReport.toObject();
};
