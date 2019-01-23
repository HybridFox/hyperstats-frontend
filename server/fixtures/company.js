const mongoose = require("mongoose");
const CompanyModel = require("../models/company");

const defaultCompany = {
	_id: mongoose.Types.ObjectId("5c485d0029abc50032947f91"),
	data: {
		name: "Default company",
		address: {
			street: "Veldkant",
			number: "33A",
			zipCode: 2550,
			city: "Kontich",
			country: "BE",
		},
	},
	meta: {
		type: "R",
	},
};

module.exports = async() => {
	const comp = await CompanyModel.findOne({ _id: defaultCompany._id }).lean().exec();

	if (comp) {
		return;
	}

	return new CompanyModel(defaultCompany).save();
};
