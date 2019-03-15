const { isNil } = require("ramda");
const AuditLogModel = require("../../../models/auditLog");
const errors = require("../../../helpers/errorHandler");

module.exports = (reportedById) => {
	if (isNil(reportedById)) {
		throw errors.ItemNotFound;
	}

	return AuditLogModel
		.find({ "data.reportingCompany": reportedById })
		.sort("meta.lastUpdated")
		.lean()
		.exec();
};
