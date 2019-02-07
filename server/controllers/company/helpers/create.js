const CompanyModel = require("../../../models/company");

module.exports = async({ type, companyOfUser, company } = {}) => {
	const newCompany = new CompanyModel({ data: company });

	newCompany.meta.managedBy = companyOfUser;
	newCompany.meta.type = type;

	await newCompany.save();

	return newCompany.toObject();
};
