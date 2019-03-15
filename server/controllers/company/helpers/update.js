const CompanyModel = require("../../../models/company");
const errors = require("../../../helpers/errorHandler");

module.exports = async({ _id, companyOfUser, update } = {}) => {
	const query = {
		_id,
		...(companyOfUser ? { "meta.managedBy": companyOfUser } : {}),
	};

	const company = await CompanyModel.findOne(query).exec();

	if (!company) {
		throw errors.CompanyNotFound;
	}

	const originalCompany = company.toObject();

	company.data = update.data;
	company.meta = {
		...originalCompany.meta,
		...update.meta,
		lastUpdated: Date.now(),
		managedBy: companyOfUser || update.meta.managedBy,
	};

	await company.save();

	return company.toObject();
};
