const mongoose = require("mongoose");
const { v4: uuid } = require("node-uuid");

const RecyclingStepSchema = mongoose.Schema({
	uuid: {
		type: String,
		required: true,
		default: uuid,
	},
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
	},
});

module.exports = mongoose.model("RecyclingProcess", RecyclingProcessSchema);
