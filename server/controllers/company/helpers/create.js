const CompanyModel = require("../../../models/company");

module.exports = async({ companyOfUser, company } = {}) => {
	const newCompany = new CompanyModel(company);

	newCompany.meta.managedBy = companyOfUser || null;

	await newCompany.save();

	return newCompany.toObject();
};
