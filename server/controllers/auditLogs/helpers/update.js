const AuditLogModel = require("../../../models/auditLog");
const errors = require("../../../helpers/errorHandler");

module.exports = ({ report, user, status }) => {
	const newLog = {
		activity: `${user.data.firstname} ${user.data.lastname} ${status.toLowerCase()} a report: ${report.data.information.name}`,
		timestamp: new Date(),
		user: user._id,
	};

	return AuditLogModel.findOneAndUpdate(
		{ "data.item": report._id },
		{ $push: { "data.logs": newLog }, $set: { "meta.lastUpdated": new Date() } },
		{ new: true }
	)
		.exec()
		.then((response) => {
			if (!response) {
				throw errors.LogNotFound;
			}

			return response;
		});
};
