const CompanyModel = require("../../../models/company");
const errors = require("../../../helpers/errorHandler");
const getCompanyQuery = require("./getQuery");

module.exports = async({ _id, companyOfUser, isAdmin } = {}) => {
	const company = await CompanyModel.findOne(getCompanyQuery(_id, companyOfUser, isAdmin)).lean().exec();

	if (!company) {
		throw errors.CompanyNotFound;
	}

	return company;
};
