const { mergeDeepLeft, pathOr } = require("ramda");
const ReportModel = require("../../../models/report");
const errors = require("../../../helpers/errorHandler");
const getReportQuery = require("./getQuery");
const { REPORT_STATUS } = require("./const");

const getCurrentReport = async(id, query) => {
	const report = await ReportModel.findOne(query).lean().exec();

	if (!report) {
		throw errors.ItemNotFound;
	}

	if (pathOr(REPORT_STATUS.FILED, ["meta", "status"], report) === REPORT_STATUS.FILED) {
		throw errors.ItemCannotBeUpdated;
	}

	return report;
};

const updateReport = async(id, query, updatedData, updatedStatus, updatedState, currentReport) => {
	const report = await ReportModel.findOneAndUpdate(
		query,
		{ $set: mergeDeepLeft({
			data: updatedData,
			meta: {
				status: updatedStatus,
				state: updatedState,
				lastUpdated: new Date(),
			},
		}, currentReport) },
		{ new: true }
	);

	if (!report) {
		throw errors.ItemNotFound;
	}

	return report;
};

module.exports = async({ _id, reportedById, updatedData, updatedStatus, updatedState } = {}) => {
	const query = getReportQuery(_id, reportedById);
	const currentReport = await getCurrentReport(_id, query);

	return await updateReport(_id, query, updatedData, updatedStatus, updatedState, currentReport);
};
