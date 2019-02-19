const ReportModel = require("../../../models/report");

const getQuery = (reportedById) => ({
	"meta.reportingCompany": reportedById,
});

module.exports = async({ reportedById }) => {
	return ReportModel.find(getQuery(reportedById)).lean().exec();
};
