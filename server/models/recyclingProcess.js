const mongoose = require("mongoose");

const RecyclingStepSchema = mongoose.Schema({
	precedingStep: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	site: {
		type: String,
		required: true,
	},
	methodOfProcessing: {
		type: String,
		required: true,
	},
	qualitativeDescription: {
		text: {
			type: String,
		},
		asset: {
			type: String,

		}
	},
	schematicOverview: {
		type: String,
	}
});

const RecyclingProcessSchema = mongoose.Schema({
	data: {
		name: {
			type: String,
			required: true,
		},
		steps: [RecyclingStepSchema],
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

module.exports = mongoose.model("RecyclingProcess", RecyclingProcessSchema);
