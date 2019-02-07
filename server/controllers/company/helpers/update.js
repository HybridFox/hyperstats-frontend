const CompanyModel = require("../../../models/company");
const ResponseError = require("../../../helpers/errors/responseError");
const getCompanyQuery = require("./getQuery");

module.exports = async({ _id, companyOfUser, update } = {}) => {
	const updatedCompany = await CompanyModel.findOneAndUpdate(getCompanyQuery(_id, companyOfUser), { $set: { data: update } }, { new: true });

	if (!updatedCompany) {
		throw new ResponseError({ type: 404, msg: "Company not found", error: `Company not found for id: ${_id}` });
	}

	return updatedCompany;
};
