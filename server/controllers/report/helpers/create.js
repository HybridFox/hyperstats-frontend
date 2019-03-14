const ReportModel = require("../../../models/report");

module.exports = async({ report = {}, meta = {}, companyId }) => {
	return ReportModel.create({
		data: report,
		meta: {
			...meta,
			reportingCompany: companyId,
		},
	});
};
