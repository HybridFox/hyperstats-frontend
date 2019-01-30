const CompanyModel = require("../../../models/company");
const ResponseError = require("../../../helpers/errors/responseError");
const getCompanyQuery = require("./getCompanyQuery");

module.exports = async({ _id, companyOfUser } = {}) => {
	const response = await CompanyModel.remove(getCompanyQuery(_id, companyOfUser)).exec();

	if (response.n === 0) {
		throw new ResponseError({ type: 404, msg: "Company not found", error: `Company not found for id: ${_id}` });
	}

	return;
};
