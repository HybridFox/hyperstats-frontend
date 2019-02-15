const createObjectId = require("mongoose").Types.ObjectId;

const REPORT_STATUS = ["SAVED", "FILED"];

const NEW_REPORT = {
	information: {
		reportingYear: 2019,
		recyclingProcess: createObjectId(),
		name: "name",
		receiver: createObjectId(),
	},
	inputFraction: [{
		siteRef: "siteRef",
		data: {
			processChemistry: "processChemistry",
			weightInput: 1,
			shareOfBatteryType: 1,
			weightBatteryType: 1,
			excessMaterialReceived: [{
				impurities: 1,
				PackagingMaterial: 1,
			}],
			elements: [{
				element: "element",
				mass: 1,
			}],
			descriptionOfMethodologyShare: "descriptionOfMethodologyShare",
			descriptionOfMethodologyChemicalComposition: "descriptionOfMethodologyChemicalComposition",
			massOfExternalJacket: 1,
			massOfOuterCasings: 1,
		},
	}],
	additives: [{
		type: "type",
		weight: 1,
		chemicalComposition: [{
			element: "element",
			weight: 1,
		}],
	}],
	outputFraction: [{
		siteRef: "outputFraction",
		data: [{
			element: "element",
			mass: 1,
			classification: "classification",
			replacedMaterial: "replacedMaterial",
			elementCompound: "elementCompound",
			shareOutputFraction: "shareOutputFraction",
		}],
	}],
	recyclingEfficiency: {
		calculatedEfficiency: 1,
	},
	additionalInformation: {
		files: [{
			type: createObjectId(),
		}],
		additionalInformation: "additionalInformation",
	},
};

module.exports = {
	REPORT_STATUS,
	NEW_REPORT,
};
