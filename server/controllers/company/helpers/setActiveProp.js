const CompanyModel = require("../../../models/company");
const errors = require("../../../helpers/errorHandler");
const getCompanyQuery = require("./getQuery");

module.exports = async({ _id, value, companyOfUser, isAdmin }) => {
	const company = await CompanyModel.findOneAndUpdate(
		getCompanyQuery(_id, companyOfUser, isAdmin),
		{ $set: { "meta.activated": value } },
		{ new: true }
	).exec();

	if (!company) {
		throw errors.ItemNotFound;
	}

	return company.toObject();
};
