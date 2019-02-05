const mongoose = require("mongoose");

const RecyclingStepSchema = mongoose.Schema({
	precedingStep: {
		type: String,
	},
	description: {
		type: String,
	},
	site: {
		type: String,
	},
	methodOfProcessing: {
		type: String,
	},
	qualitativeDescription: {
		text: {
			type: String,
		},
		asset: {
			type: String,

		},
	},
	schematicOverview: {
		type: String,
	},
});

const RecyclingProcessSchema = mongoose.Schema({
	data: {
		name: {
			type: String,
		},
		steps: [RecyclingStepSchema],
	},
	meta: {
		created: {
			type: Date,
			default: Date.now,
		},
		lastUpdated: {
			type: Date,
			default: Date.now,
		},
		activated: {
			type: Boolean,
			default: false,
		},
	},
});

module.exports = mongoose.model("RecyclingProcess", RecyclingProcessSchema);
