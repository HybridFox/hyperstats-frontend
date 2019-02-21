const mongoose = require("mongoose");
const { REPORT_STATUS } = require("../controllers/report/helpers/const");

const ReportSchema = mongoose.Schema({
	data: {
		information: {
			reportingYear: {
				type: Number,
				required: function() {
					return this.meta.status === REPORT_STATUS.FILED;
				},
			},
			recyclingProcess: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "RecyclingProcess",
				required: function() {
					return this.meta.status === REPORT_STATUS.FILED;
				},
			},
			name: {
				type: String,
				required: function() {
					return this.meta.status === REPORT_STATUS.FILED;
				},
			},
			receiver: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Company",
				required: function() {
					return this.meta.status === REPORT_STATUS.FILED;
				},
			},
		},
		inputFraction: [{
			siteRef: {
				type: String,
			},
			data: {
				processChemistry: {
					type: String,
				},
				weightInput: {
					type: Number,
				},
				shareOfBatteryType: {
					type: Number,
				},
				weightBatteryType: {
					type: Number,
				},
				excessMaterialReceived: [{
					impurities: {
						type: Number,
					},
					packagingMaterial: {
						type: Number,
					},
				}],
				elements: [{
					element: {
						type: String,
					},
					mass: {
						type: Number,
					},
				}],
				descriptionOfMethodologyShare: {
					type: String,
				},
				descriptionOfMethodologyChemicalComposition: {
					type: String,
				},
				massOfExternalJacket: {
					type: Number,
				},
				massOfOuterCasings: {
					type: Number,
				},
			},
		}],
		additives: [{
			type: {
				type: String,
			},
			weight: {
				type: Number,
			},
			chemicalComposition: [{
				element: {
					type: String,
				},
				weight: {
					type: Number,
				},
			}],
		}],
		outputFraction: [{
			siteRef: {
				type: String,
			},
			data: [{
				element: {
					type: String,
				},
				mass: {
					type: Number,
				},
				classification: {
					type: String,
				},
				replacedMaterial: {
					type: String,
				},
				elementCompound: {
					type: String,
				},
				shareOutputFraction: {
					type: String,
				},
			}],
		}],
		recyclingEfficiency: {
			calculatedEfficiency: {
				type: Number,
				required: function() {
					return this.meta.status === REPORT_STATUS.FILED;
				},
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
			},
		},
	},
	meta: {
		approvedCompanies: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
		}],
		reportingCompany: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
			required: true,
		},
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
			type: String,
			enum: [REPORT_STATUS.SAVED, REPORT_STATUS.FILED],
			default: REPORT_STATUS.SAVED,
		},
	},
});

module.exports = mongoose.model("Report", ReportSchema);
