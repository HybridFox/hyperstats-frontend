const CompanyModel = require("../../../models/company");
const ResponseError = require("../../../helpers/errors/responseError");
const getCompanyQuery = require("./getQuery");

module.exports = async({ _id, companyOfUser, isAdmin } = {}) => {
	const company = await CompanyModel.findOne(getCompanyQuery(_id, companyOfUser, isAdmin)).lean().exec();

	if (!company) {
		throw new ResponseError({ type: 404, msg: "Company not found", error: `Company not found for id: ${_id}` });
	}

	return company;
};
