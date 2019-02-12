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
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			receiver: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Company",
				required: true,
			},
		},
		inputFraction: [{
			siteRef: {
				type: String,
			},
			data: {
				processChemistry: {
					type: String,
					required: true,
				},
				weightInput: {
					type: Number,
					required: true,
				},
				shareOfBatteryType: {
					type: Number,
					required: true,
				},
				weightBatteryType: {
					type: Number,
					required: true,
				},
				excessMaterialReceived: [{
					impurities: {
						type: Number,
						required: true,
					},
					PackagingMaterial: {
						type: Number,
						required: true,
					},
				}],
				elements: [{
					element: {
						type: String,
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
					type: Number,
					required: true,
				},
				massOfOuterCasings: {
					type: Number,
					required: true,
				},
			},
		}],
		additives: [{
			type: {
				type: String,
				required: true,
			},
			weight: {
				type: Number,
				required: true,
			},
			chemicalComposition: [{
				element: {
					type: String,
					required: true,
				},
				weight: {
					type: Number,
					required: true,
				},
			}],
		}],
		outputFraction: [{
			siteRef: {
				type: String,
			},
			data: {
				element: {
					type: String,
					required: true,
				},
				mass: {
					type: Number,
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
			},
		}],
		recyclingEfficiency: {
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
