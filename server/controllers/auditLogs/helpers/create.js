const AuditLogModel = require("../../../models/auditLog");
const recyclingProcessManager = require("../../recyclingProcess/helpers/recyclingProcessManager");
const { getOne } = require("../../company/helpers");

const { pathOr } = require("ramda");

module.exports = async({ item, type, user, action = "created" }) => {
	const recyclingProcess = await recyclingProcessManager.getById({
		_id: item.recyclingProcess,
		createdByCompany: pathOr(null, ["data", "company", "_id"], user),
	});

	const company = await getOne({
		_id: item.proxy,
		companyOfUser: item.proxy,
		isAdmin: false,
	});

	const itemName = (type === "proxy") ? `${recyclingProcess.data.name} in ${item.year} to ${company.data.name}` : item.data.information.name;

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
