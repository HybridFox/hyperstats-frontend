const { isNil, unnest, sort, descend, prop } = require("ramda");
const AuditLogModel = require("../../../models/auditLog");
const errors = require("../../../helpers/errorHandler");

module.exports = async(reportedById) => {
	if (isNil(reportedById)) {
		throw errors.ItemNotFound;
	}

	const logs = await AuditLogModel
		.find({ "data.reportingCompany": reportedById })
		.populate("data.logs.user")
		.sort("-meta.lastUpdated")
		.lean()
		.exec();

	const logMessages = logs.reduce((acc, log) => [...acc, log.data.logs], []);

	const logMessagesToSingleArray = unnest(logMessages);

	return sort(descend(prop("timestamp")))(logMessagesToSingleArray);
};
