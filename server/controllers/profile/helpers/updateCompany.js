const CompanyModel = require("../../../models/company");

module.exports = (id, company) => CompanyModel.findOneAndUpdate(
	{ _id: id },
	{ $set: {
		data: company,
		"meta.lastUpdated": Date.now(),
	} },
	{ new: true }
).exec();
