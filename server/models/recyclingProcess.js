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
			id: {
				type: String,
			},
			mimetype: {
				type: String,
			},
			uploadDate: {
				type: String,
			},
			originalname: {
				type: String,
			},
		},
	},
	schematicOverview: {
		id: {
			type: String,
		},
		mimetype: {
			type: String,
		},
		uploadDate: {
			type: String,
		},
		originalname: {
			type: String,
		},
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
		deleted: {
			type: Boolean,
			default: false,
		},
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
			default: true,
		},
	},
});

module.exports = mongoose.model("RecyclingProcess", RecyclingProcessSchema);
