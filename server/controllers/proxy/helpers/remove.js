const ReportModel = require("../../../models/report");
const Errors = require("../../../helpers/errorHandler");

module.exports = async({ proxy, recyclingProcess, year, userCompany }) => {
	const updateResult = await ReportModel.updateMany({
		"data.information.reportingYear": year,
		"data.information.recyclingProcess": recyclingProcess,
		"meta.approvedCompanies": {
			$elemMatch: {
				company: proxy,
				approvedBy: userCompany._id,
			},
		},
	}, {
		$pull: {
			"meta.approvedCompanies": {
				company: proxy,
				approvedBy: userCompany._id,
			},
		},
	});

	if (updateResult.n <= 0) {
		throw Errors.ItemNotFound;
	}
};
