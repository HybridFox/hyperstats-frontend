const ReportModel = require("../../../models/report");

module.exports = async({ proxy, recyclingProcess, year, userCompany } = {}) => {
	await ReportModel.updateMany({
		"data.information.reportingYear": year,
		"data.information.recyclingProcess": recyclingProcess,
		"meta.approvedCompanies": {
			$not: {
				$elemMatch: {
					company: proxy,
				},
			},
		},
		$or: [
			{
				"meta.reportingCompany": userCompany,
			},
			{
				"meta.approvedCompanies": {
					$elemMatch: {
						company: userCompany,
					},
				},
			},
		],
	}, {
		$addToSet: {
			"meta.approvedCompanies": {
				approvedBy: userCompany,
				company: proxy,
				linkedApprovals: [],
			},
		},
	}).exec();
};
