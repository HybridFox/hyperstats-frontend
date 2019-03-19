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
			siteRef: {
				type: String,
			},
			data: [{
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
				virginClassification: {
					type: String,
				},
				virginReplacedMaterial: {
					type: String,
				},
				elementDestinationIndustry: {
					type: String,
				},
				elementDestinationCompany: {
					type: String,
				},
				assignedStep: {
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
				assetId: {
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
			}],
			additionalInformation: {
				type: String,
			},
		},
	},
	meta: {
		approvedCompanies: [{
			approvedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Company",
			},
			company: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Company",
			},
			linkedApprovals: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Company",
			}],
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
		state: {
			isPristine: {
				information: {
					type: Boolean,
					required: true,
					default: true,
				},
				inputFraction: {
					type: Boolean,
					required: true,
					default: true,
				},
				additives: {
					type: Boolean,
					required: true,
					default: true,
				},
				outputFraction: {
					type: Boolean,
					required: true,
					default: true,
				},
				recyclingEfficiency: {
					type: Boolean,
					required: true,
					default: true,
				},
				additionalInformation: {
					type: Boolean,
					required: true,
					default: true,
				},
			},
		},
	},
});

module.exports = mongoose.model("Report", ReportSchema);
