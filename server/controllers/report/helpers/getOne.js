const ReportModel = require("../../../models/report");
const ResponseError = require("../../../helpers/errors/responseError");
const getReportQuery = require("./getQuery");

module.exports = async({ _id, reportedById } = {}) => {
	const report = await ReportModel.findOne(getReportQuery(_id, reportedById)).lean().exec();

	if (!report) {
		throw new ResponseError({ type: 404, msg: "Report not found", error: `Report not found for id: ${_id}` });
	}

	return report;
};
