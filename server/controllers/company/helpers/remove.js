const CompanyModel = require("../../../models/company");
const errors = require("../../../helpers/errorHandler");
const getCompanyQuery = require("./getQuery");

module.exports = async({ _id, companyOfUser, isAdmin = false } = {}) => {
	const response = await CompanyModel.findOneAndUpdate(getCompanyQuery(_id, companyOfUser, isAdmin), { $set: { "meta.deleted": true } }).exec();

	if (!response) {
		throw errors.CompanyNotFound;
	}

	return;
};
