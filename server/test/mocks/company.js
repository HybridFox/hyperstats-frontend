const mongoose = require("mongoose");

module.exports = {
	_id: mongoose.Types.ObjectId("5c485d0029abc50032947f92"),
	data: {
		name: "Some company",
		address: {
			street: "Some street",
			number: "2",
			box: "wala",
			zipCode: "9000",
			city: "Ghent",
			country: "BE",
		},
	},
};
