const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
	data: {
		information: {
			reportingYear: {
				type: Number,
				required: true,
			},
			recyclingProcess: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "RecyclingProcess",
			},
			name: {
				type: String,
				required: true,
			},
			receiver: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Company",
			},
		},
		inputFraction: {
			processChemistry: {
				type: String,
				required: true,
			},
			weightInput: {
				type: String,
				required: true,
			},
			shareOfBatteryType: {
				type: String,
				required: true,
			},
			weightBatteryType: {
				type: String,
				required: true,
			},
			excessMaterialReceived: [{
				impurities: {
					type: {
						type: Number,
						required: true,
					},
					packagingMaterial: {
						type: Number,
						required: true,
					},
				},
			}],
			elements: [{
				element: {
					type: String,
					required: true,
				},
				share: {
					type: Number,
					required: true,
				},
				mass: {
					type: Number,
					required: true,
				},
			}],
			descriptionOfMethodologyShare: {
				type: String,
				required: true,
			},
			descriptionOfMethodologyChemicalComposition: {
				type: String,
				required: true,
			},
			massOfExternalJacket: {
				type: String,
				required: true,
			},
			massOfOuterCasings: {
				type: String,
				required: true,
			},
		},
		additives: [{
			type: {
				type: String,
				required: true,
			},
			weight: {
				type: Number,
				required: true,
			},
		}],
		outputFraction: [{
			element: {
				type: String,
				required: true,
			},
			share: {
				type: Number,
				required: true,
			},
			mass: {
				type: String,
				required: true,
			},
			classification: {
				type: String,
				required: true,
			},
			replacedMaterial: {
				type: String,
				required: true,
			},
			elementCompound: {
				type: String,
				required: true,
			},
			shareOutputFraction: {
				type: String,
				required: true,
			},
		}],
		recyclingEfficiency: {
			overviewElements: [{
				element: {
					type: String,
					required: true,
				},
				input: {
					type: String,
					required: true,
				},
				output: {
					type: String,
					required: true,
				},
			}],
			calculatedEfficiency: {
				type: Number,
				required: true,
			},
		},
		additionalInformation: {
			files: [{
				type: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Asset",
				},
			}],
			additionalInformation: {
				type: String,
				required: true,
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
		deleted: {
			type: Boolean,
			default: false,
		},
		status: {
			type: {
				type: String,
				enum: ["SAVED", "FILED"],
				default: "SAVED",
			},
		},
	},
});

module.exports = mongoose.model("Report", ReportSchema);
