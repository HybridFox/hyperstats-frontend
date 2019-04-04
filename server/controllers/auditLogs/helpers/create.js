const AuditLogModel = require("../../../models/auditLog");

module.exports = async({ item, type, user, action = "created" }) => {
	const itemName = (type === "proxy") ? item.proxy : item.data.information.name;

	const newLog = new AuditLogModel({
		data: {
			report: (type === "report") ? item._id : null,
			proxy: (type === "proxy") ? item.proxy : null,
			reportingCompany: user.data.company._id,
			logs: [{
				activity: `${user.data.firstname} ${user.data.lastname} ${action} a ${type}: ${itemName}`,
				timestamp: new Date(),
				user: user._id,
			}],
		},
	});

	await newLog.save();

	return newLog.toObject();
};
