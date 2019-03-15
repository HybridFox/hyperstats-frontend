const ReportModel = require("../../../models/report");
const { isNil } = require("ramda");
const { REPORT_SORT_OPTIONS, REPORT_STATUS } = require("./const");
const { COMPANY_TYPES } = require("../../company/helpers/const");

const getQuery = (reportedById, recyclingProcessId, recycler, companyType) => {
	const query = {
		$and: [],
	};

	if (companyType === COMPANY_TYPES.R) {
		query.$and.push({ "meta.reportingCompany": reportedById });
	}

	if (companyType === COMPANY_TYPES.CO || companyType === COMPANY_TYPES.AO) {
		query.$and.push({ "meta.approvedCompanies": reportedById }, { "meta.status": REPORT_STATUS.FILED });
	}

	if (!isNil(recyclingProcessId)) {
		query.$and.push({ "data.information.recyclingProcess": recyclingProcessId });
	}

	if (!isNil(recycler)) {
		query.$and.push({ "meta.reportingCompany": recycler });
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

module.exports = async({ reportedById, recyclingProcessId, recycler, companyType, sortBy }) => {
	return ReportModel
		.find(getQuery(reportedById, recyclingProcessId, recycler, companyType))
		.populate("meta.reportingCompany", "data.name")
		.populate("data.information.recyclingProcess", "data.name")
		.sort(setSorting(sortBy))
		.lean()
		.exec();
};
