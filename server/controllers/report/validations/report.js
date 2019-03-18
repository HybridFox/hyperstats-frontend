const joi = require("joi");
const { schemas } = require("../../../helpers/validation");
const { REPORT_STATUS, DEFAULT_REPORT_STATE } = require("../helpers/const");

const savedData = {
	information: joi.object().keys({
		reportingYear: joi.number(),
		recyclingProcess: joi.string(),
		name: joi.string().allow(""),
		// receiver: joi.string().allow(null).optional(),
	}),
	inputFraction: joi.array().items(joi.object().keys({
		siteRef: joi.string().allow(""),
		data: joi.object().keys({
			processChemistry: joi.string().allow("").optional(),
			weightInput: joi.number().allow(null).optional(),
			shareOfBatteryType: joi.number().allow(null).optional(),
			weightBatteryType: joi.number().allow(null).optional(),
			excessMaterialReceived: joi.array().items(joi.object().keys({
				impurities: joi.number().allow(null).optional(),
				packagingMaterial: joi.number().allow(null).optional(),
				water: joi.number().allow(null).optional(),
				otherMaterials: joi.number().allow(null).optional(),
			})),
			elements: joi.array().items(joi.object().keys({
				element: joi.string().allow("").optional(),
				mass: joi.number().allow(null).optional(),
			})),
			descriptionOfMethodologyShare: joi.string().allow("").optional(),
			descriptionOfMethodologyChemicalComposition: joi.string().allow("").optional(),
			massOfExternalJacket: joi.number().allow(null).optional(),
			massOfOuterCasings: joi.number().allow(null).optional(),
		}),
	})),
	additives: joi.array().items(joi.object().keys({
		siteRef: joi.string().allow(""),
		data: joi.array().items(joi.object().keys({
			type: joi.string().allow("").optional(),
			weight: joi.number().allow(null).optional(),
			chemicalComposition: joi.array().items(joi.object().keys({
				element: joi.string().allow("").optional(),
				weight: joi.number().allow(null).optional(),
			})),
		})),
	})),
	outputFraction: joi.array().items(joi.object().keys({
		siteRef: joi.string().allow(""),
		data: joi.array().items(joi.object().keys({
			element: joi.string().allow("").optional(),
			mass: joi.number().allow(null).optional(),
			virginClassification: joi.string().allow("").optional(),
			virginReplacedMaterial: joi.string().allow("", null).optional(),
			elementDestinationIndustry: joi.string().allow("", null).optional(),
			elementDestinationCompany: joi.string().allow("", null).optional(),
			assignedStep: joi.string().allow("", null).optional(),
		})),
	})),
	recyclingEfficiency: joi.object().keys({
		calculatedEfficiency: joi.number().allow(null).optional(),
	}),
	additionalInformation: joi.object().keys({
		files: joi.array().items(joi.object().keys({
			assetId: joi.string().allow(""),
			mimetype: joi.string().allow(""),
			uploadDate: joi.string().allow(""),
			originalname: joi.string().allow(""),
		})).optional().allow(null),
		additionalInformation: joi.string().allow("").optional(),
	}),
};

const filedData = {
	information: joi.object().keys({
		reportingYear: joi.number().required(),
		recyclingProcess: joi.string().required(),
		name: joi.string().required(),
		// receiver: joi.string().allow(null).required(),
	}),
	inputFraction: joi.array().items(joi.object().keys({
		siteRef: joi.string(),
		data: joi.object().keys({
			processChemistry: joi.string().required(),
			weightInput: joi.number().required(),
			shareOfBatteryType: joi.number().required(),
			weightBatteryType: joi.number().required(),
			excessMaterialReceived: joi.array().items(joi.object().keys({
				impurities: joi.number().required(),
				packagingMaterial: joi.number().required(),
				water: joi.number().required(),
				otherMaterials: joi.number().required(),
			})),
			elements: joi.array().items(joi.object().keys({
				element: joi.string().required(),
				mass: joi.number().required(),
			})),
			descriptionOfMethodologyShare: joi.string().required(),
			descriptionOfMethodologyChemicalComposition: joi.string().required(),
			massOfExternalJacket: joi.number().required(),
			massOfOuterCasings: joi.number().required(),
		}),
	})),
	additives: joi.array().items(joi.object().keys({
		siteRef: joi.string(),
		data: joi.array().items(joi.object().keys({
			type: joi.string(),
			weight: joi.number(),
			chemicalComposition: joi.array().items(joi.object().keys({
				element: joi.string().required(),
				weight: joi.number().required(),
			})),
		}).when(joi.object({ weight: null, type: "" }).unknown(), {
			then: joi.object({
				type: joi.string().allow("").optional(),
				weight: joi.number().allow(null).optional(),
			}),
			otherwise: joi.object({
				type: joi.string().required(),
				weight: joi.number().required(),
			}),
		})),
	})),
	outputFraction: joi.array().items(joi.object().keys({
		siteRef: joi.string(),
		data: joi.array().items(joi.object().keys({
			element: joi.string().required(),
			mass: joi.number().required(),
			virginClassification: joi.string().required(),
			virginReplacedMaterial: joi.string().when("virginClassification", { is: "RECYCLING", then: joi.string().required(), otherwise: joi.string().allow("", null) }),
			elementDestinationIndustry: joi.string(),
			elementDestinationCompany: joi.string(),
			assignedStep: joi.string(),
		}).when(joi.object({ assignedStep: "" }).unknown(), {
			then: joi.object({
				elementDestinationIndustry: joi.string().required(),
				elementDestinationCompany: joi.string().required(),
				assignedStep: joi.string().allow("", null),
			}),
			otherwise: joi.object({
				elementDestinationIndustry: joi.string().allow("", null),
				elementDestinationCompany: joi.string().allow("", null),
				assignedStep: joi.string().required(),
			}),
		})),
	})),
	recyclingEfficiency: joi.object().keys({
		calculatedEfficiency: joi.number().required(),
	}),
	additionalInformation: joi.object().keys({
		files: joi.array().items(joi.object().keys({
			type: joi.string(),
		})),
		additionalInformation: joi.string().allow("").optional(),
	}),
};

const schema = joi.object().keys({
	data: joi.alternatives().when("meta.status", { is: REPORT_STATUS.FILED, then: joi.object().keys(filedData), otherwise: joi.object().keys(savedData) }).required(),
	meta: joi.object().keys({
		approvedCompanies: joi.array().items(joi.string()).optional(),
		status: joi.string().valid([REPORT_STATUS.FILED, REPORT_STATUS.SAVED]).optional(),
		state: joi.object().keys({
			isPristine: joi.object().keys({
				information: joi.boolean().optional().default(true),
				inputFraction: joi.boolean().optional().default(true),
				additives: joi.boolean().optional().default(true),
				outputFraction: joi.boolean().optional().default(true),
				recyclingEfficiency: joi.boolean().optional().default(true),
				additionalInformation: joi.boolean().optional().default(true),
			}).optional().default(DEFAULT_REPORT_STATE.isPristine),
		}).optional().default(DEFAULT_REPORT_STATE),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
