const ReportModel = require("../../../models/report");
const Errors = require("../../../helpers/errorHandler");

module.exports = async({ proxy, recyclingProcess, year, userCompany } = {}) => {
	const updateResponse = await ReportModel.updateMany({
		"data.information.reportingYear": year,
		"data.information.recyclingProcess": recyclingProcess,
		"meta.approvedCompanies": {
			$not: {
				$elemMatch: {
					company: proxy,
				},
			},
		},
	}, {
		$addToSet: {
			"meta.approvedCompanies": {
				approvedBy: userCompany,
				company: proxy,
				linkedApprovals: [],
			},
		},
	}).exec();

	if (updateResponse.n <= 0) {
		throw Errors.ItemNotFound;
	}
};
