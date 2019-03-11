const createObjectId = require("mongoose").Types.ObjectId;

const NEW_REPORT = {
	information: {
		reportingYear: 2019,
		recyclingProcess: createObjectId(),
		name: "name",
		// receiver: createObjectId(),
	},
	inputFraction: [{
		siteRef: "inputFraction",
		data: {
			processChemistry: "processChemistry",
			weightInput: 1,
			shareOfBatteryType: 1,
			weightBatteryType: 1,
			excessMaterialReceived: [{
				impurities: 1,
				packagingMaterial: 1,
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
		siteRef: "additive",
		data: [{
			type: "type",
			weight: 1,
			chemicalComposition: [{
				element: "element",
				weight: 1,
			}],
		}],
	}],
	outputFraction: [{
		siteRef: "outputFraction",
		data: [{
			element: "element",
			mass: 1,
			virginClassification: "virginClassification",
			virginReplacedMaterial: "virginReplacedMaterial",
			elementClassification: "elementClassification",
			elementReplacedMaterial: "elementReplacedMaterial",
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

const mock = {
	_id: "5c6d59333a069902e233b624",
	data: NEW_REPORT,
	meta: {
		status: "FILED",
		lastUpdated: "2019-02-20T13:45:03.792Z",
		approvedCompanies: [],
		deleted: false,
		reportingCompany: "5c485d0029abc50032947f91",
		created: "2019-02-20T13:42:11.546Z",
	},
};

module.exports = {
	NEW_REPORT,
	mock,
};
