const ReportModel = require("../../../models/report");
const { REPORT_STATUS } = require("./const");
const { uniq } = require("ramda");
const { COMPANY_TYPES } = require("../../company/helpers/const");

const getQuery = (filterType, reportedById, companyType) => {
	let query = {};

	if (!filterType && (companyType === COMPANY_TYPES.CO || companyType === COMPANY_TYPES.AO)) {
		return query = {
			$and: [{
				"meta.status": REPORT_STATUS.FILED,
			}, {
				$or: [{
					"meta.approvedCompanies": {
						$elemMatch: {
							company: reportedById,
						},
					},
				}, {
					"meta.approvedCompanies": {
						$elemMatch: {
							linkedApprovals: {
								$elemMatch: { $in: [reportedById] },
							},
						},
					},
				}],
			}],
		};
	}

	if (filterType === COMPANY_TYPES.CO) {
		query = {
			"meta.approvedCompanies.linkedApprovals": {
				$elemMatch: { $in: [reportedById] },
			},
		};
	} else {
		query = {
			"meta.approvedCompanies": {
				$elemMatch: {
					company: reportedById,
				},
			},
		};
	}

	return query;
};
const getReports = async(filterType, reportedById, companyType) => {
	return ReportModel
		.find(getQuery(filterType, reportedById, companyType))
		.populate("meta.reportingCompany")
		.populate("meta.approvedCompanies.linkedApprovals")
		.lean()
		.exec();
};

const mapCompanies = (filterType, reports) => {
	if (filterType === COMPANY_TYPES.AO) {
		return reports
			.map(report => report.meta.approvedCompanies)
			.map(report => report[0].linkedApprovals)
			.reduce((acc, companies) => acc.concat(companies), []);
	}

	return reports.map((report) => report.meta.reportingCompany);
};

const getCompanies = (filterType, reports) => {
	return uniq(mapCompanies(filterType, reports));
};

module.exports = async({ filterType, reportedById, companyType }) => {
	const reports = await getReports(filterType, reportedById, companyType);

	return getCompanies(filterType, reports);
};
