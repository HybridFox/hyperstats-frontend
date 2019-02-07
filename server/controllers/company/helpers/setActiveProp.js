const CompanyModel = require("../../../models/company");
const errors = require("../../../helpers/errorHandler");

module.exports = async(_id, bool) => {
	const company = await CompanyModel.findOneAndUpdate({ _id }, { $set: { "meta.activated": bool } }, { new: true }).exec();

	if (!company) {
		throw errors.ItemNotFound;
	}

	return company.toObject();
};
