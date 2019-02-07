const CompanyModel = require("../../../models/company");

module.exports = ({ type, companyOfUser } = {}) => {
	return CompanyModel.find({
		"meta.type": type,
		$or: [{
			"meta.managedBy": companyOfUser,
		}, {
			_id: companyOfUser,
		}],
	}).lean().exec();
};
