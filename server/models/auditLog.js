const mongoose = require("mongoose");

const AuditLog = mongoose.Schema({
	data: {
		report: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Report",
		},
		proxy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Proxy",
		},
		reportingCompany: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
			required: true,
		},
		logs: [{
			activity: {
				type: String,
				required: true,
			},
			timestamp: {
				type: Date,
				required: true,
				default: Date.now,
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		}],
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
	},
});

module.exports = mongoose.model("AuditLog", AuditLog);
