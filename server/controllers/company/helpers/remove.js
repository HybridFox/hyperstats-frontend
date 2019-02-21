const CompanyModel = require("../../../models/company");
const ResponseError = require("../../../helpers/errors/responseError");
const getCompanyQuery = require("./getQuery");

module.exports = async({ _id, companyOfUser, isAdmin = false } = {}) => {
	const response = await CompanyModel.findOneAndUpdate(getCompanyQuery(_id, companyOfUser, isAdmin), { $set: { "meta.deleted": true } }).exec();

	if (!response) {
		throw new ResponseError({ type: 404, msg: "Company not found", error: `Company not found for id: ${_id}` });
	}

	return;
};
