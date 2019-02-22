const ReportModel = require("../../../models/report");
const { isNil } = require("ramda");
const { REPORT_SORT_OPTIONS } = require("./const");

const getQuery = (reportedById, recyclingProcessId) => {
	const query = {
		$and: [{ "meta.reportingCompany": reportedById }],
	};

	if (!isNil(recyclingProcessId)) {
		query.$and.push({ "data.information.recyclingProcess": recyclingProcessId });
	}
	
	return query;
};

const setSorting = (sortBy) => {
	if (sortBy.indexOf("-") === 0) {
		const key = sortBy.substr(1);

		return `-${REPORT_SORT_OPTIONS[key].path}.${REPORT_SORT_OPTIONS[key].param}`;
	}

	return `${REPORT_SORT_OPTIONS[sortBy].path}.${REPORT_SORT_OPTIONS[sortBy].param}`;
};

module.exports = async({ reportedById, recyclingProcessId, sortBy }) => {
	return ReportModel.find(getQuery(reportedById, recyclingProcessId)).sort(setSorting(sortBy)).lean().exec();
};
