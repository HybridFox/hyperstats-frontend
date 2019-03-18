const AuditLogModel = require("../../models/auditLog");

module.exports.create = async(reportedBy, userId, reportId) => {
	const newReport = new AuditLogModel({
		data: {
			report: reportId,
			reportingCompany: reportedBy,
			logs: [{
				activity: "created",
				timestamp: new Date(),
				user: userId,
			}],
		},
	});

	newReport.meta.reportingCompany = reportedBy;

	return newReport.save();
};
module.exports.remove = (_id) => AuditLogModel.remove({ _id });
