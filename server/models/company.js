const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
	data: {
		name: {
			type: String,
			required: true,
		},
		vat: {
			type: String,
			required: true,
		},
		address: {
			street: {
				type: String,
				required: true,
			},
			number: {
				type: String,
				required: true,
			},
			box: {
				type: String,
			},
			zipCode: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
		},
		contactPerson: {
			name: {
				type: String,
			},
			function: {
				type: String,
			},
			phone: {
				type: String,
			},
			mobile: {
				type: String,
			},
			email: {
				type: String,
			},
		},
	},
	meta: {
		created: {
			type: Date,
			required: true,
			default: Date.now,
		},
		lastUpdated: {
			type: Date,
			required: true,
			default: Date.now,
		},
		managedBy: {
			type: String,
			ref: "Company",
		},
		activated: {
			type: Boolean,
			default: false,
		},
		deleted: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			// R => Recycler
			// RP => Recycler Partner
			// CO => Complience organization
			enum: ["R", "RP", "CO"],
		},
	},
});

module.exports = mongoose.model("Company", CompanySchema);
