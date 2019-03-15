const AuditLogModel = require("../../../models/auditLog");

module.exports = async({ report, user }) => {
	const newLog = new AuditLogModel({
		data: {
			report: report._id,
			reportingCompany: user.data.company._id,
			logs: [{
				activity: `${user.data.firstname} ${user.data.lastname} created a report: ${report.data.information.name}`,
				timestamp: new Date(),
				user: user._id,
			}],
		},
	});

	await newLog.save();

	return newLog.toObject();
};
