const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
	data: {
		name: {
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
				type: Number,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			country: {
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
		type: {
			type: String,
			enum: ["R", "CO"],
		},
	},
});

module.exports = mongoose.model("Company", CompanySchema);
