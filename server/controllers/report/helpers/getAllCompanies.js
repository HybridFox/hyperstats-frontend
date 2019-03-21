const ReportModel = require("../../../models/report");
const { REPORT_STATUS } = require("./const");
const { uniq } = require("ramda");
const { COMPANY_TYPES } = require("../../company/helpers/const");

const getQuery = (reportedById, companyType) => {
	const query = {
		"meta.approvedCompanies": {
			$elemMatch: {
				company: reportedById,
			},
		},
	};

	if (companyType === COMPANY_TYPES.CO || companyType === COMPANY_TYPES.AO) {
		query["meta.status"] = REPORT_STATUS.FILED;
	}

	return query;
};
const getReports = async(reportedById, companyType) => {
	return ReportModel
		.find(getQuery(reportedById, companyType))
		.populate("meta.reportingCompany")
		.populate("meta.approvedCompanies.linkedApprovals")
		.lean()
		.exec();
};

const mapCompanies = (getType, reports) => {
	if (getType === COMPANY_TYPES.AO) {
		return reports
			.map(report => report.meta.approvedCompanies)
			.map(report => report[0].linkedApprovals)
			.reduce((acc, companies) => acc.concat(companies), []);
	}

	return reports.map((report) => report.meta.reportingCompany);
};

const getCompanies = (getType, reports) => {
	return uniq(mapCompanies(getType, reports));
};

module.exports = async({ getType, reportedById, companyType }) => {
	const reports = await getReports(reportedById, companyType);

	return getCompanies(getType, reports);
};
