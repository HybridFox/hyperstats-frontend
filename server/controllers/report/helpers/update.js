const ReportModel = require("../../../models/report");
const ResponseError = require("../../../helpers/errors/responseError");
const getReportQuery = require("./getQuery");
const { mergeDeepLeft } = require("ramda");

const getCurrentReport = async(id, query) => {
	const report = await ReportModel.findOne(query).lean().exec();

	if (!report) {
		throw new ResponseError({ type: 404, msg: "Report not found", error: `Report not found for id: ${id}` });
	}

	return report;
};

const updateReport = async(id, query, updatedData, updatedStatus, currentReport) => {
	const report = await ReportModel.findOneAndUpdate(
		query,
		{ $set: mergeDeepLeft({
			data: updatedData,
			meta: {
				status: updatedStatus,
				lastUpdated: new Date(),
			},
		}, currentReport) },
		{ new: true }
	);

	if (!report) {
		throw new ResponseError({ type: 404, msg: "Report not found", error: `Report not found for id: ${id}` });
	}

	return report;
};

module.exports = async({ _id, reportedById, updatedData, updatedStatus } = {}) => {
	const query = getReportQuery(_id, reportedById);
	const currentReport = await getCurrentReport(_id, query);

	return await updateReport(_id, query, updatedData, updatedStatus, currentReport);
};
