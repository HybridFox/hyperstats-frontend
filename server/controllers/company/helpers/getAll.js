const CompanyModel = require("../../../models/company");

module.exports = ({ type, companyOfUser } = {}) => {
	return CompanyModel.find({
		"meta.type": type,
		"meta.deleted": false,
		$or: [{
			"meta.managedBy": companyOfUser,
		}, {
			_id: companyOfUser,
		}],
	}).lean().exec();
};
