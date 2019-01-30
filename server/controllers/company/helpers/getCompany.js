const CompanyModel = require("../../../models/company");
const ResponseError = require("../../../helpers/errors/responseError");
const getCompanyQuery = require("./getCompanyQuery");


module.exports = async({ _id, companyOfUser } = {}) => {
	const company = await CompanyModel.findOne(getCompanyQuery(_id, companyOfUser)).lean().exec();

	if (!company) {
		throw new ResponseError({ type: 404, msg: "Company not found", error: `Company not found for id: ${_id}` });
	}

	return company;
};
