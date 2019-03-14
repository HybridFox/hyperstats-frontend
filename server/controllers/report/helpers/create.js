const ReportModel = require("../../../models/report");

module.exports = async({ report = {}, meta = {}, companyId }) => {
	const newReport = new ReportModel({
		data: report,
		meta: {
			...meta,
			reportingCompany: companyId,
		},
	});

	await newReport.save();

	return newReport.toObject();
};
