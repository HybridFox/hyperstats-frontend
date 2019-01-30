const CompanyModel = require("../../models/company");
const companyMock = require("../mocks/company");

module.exports.create = async(company = companyMock, managedBy) => {
	const newCompany = new CompanyModel(company);

	newCompany.meta.managedBy = managedBy;

	return newCompany.save();
};
module.exports.remove = (_id = companyMock._id) => CompanyModel.remove({ _id });
