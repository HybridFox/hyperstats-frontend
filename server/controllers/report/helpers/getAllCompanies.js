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
		.lean()
		.exec();
};

const getCompanies = (reports) => {
	const companies = reports.map((report) => report.meta.reportingCompany);

	return uniq(companies);
};

module.exports = async({ reportedById, companyType }) => {
	const reports = await getReports(reportedById, companyType);

	return getCompanies(reports);
};
