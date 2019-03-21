const ReportModel = require("../../../models/report");
const errors = require("../../../helpers/errorHandler");
const getReportQuery = require("./getQuery");

module.exports = async({ _id, reportedById, companyType } = {}) => {
	const report = await ReportModel.findOne(getReportQuery(_id, reportedById, companyType)).lean().exec();

	if (!report) {
		throw errors.ItemNotFound;
	}

	return report;
};
