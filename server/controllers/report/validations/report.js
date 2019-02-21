const joi = require("joi");
const { schemas } = require("../../../helpers/validation");
const { REPORT_STATUS } = require("../helpers/const");

const savedData = {
	information: joi.object().keys({
		reportingYear: joi.number().optional(),
		recyclingProcess: joi.string().optional(),
		name: joi.string().optional(),
		receiver: joi.string().optional(),
	}),
	inputFraction: joi.array().items(joi.object().keys({
		siteRef: joi.string(),
		data: joi.object().keys({
			processChemistry: joi.string().optional(),
			weightInput: joi.number().optional(),
			shareOfBatteryType: joi.number().optional(),
			weightBatteryType: joi.number().optional(),
			excessMaterialReceived: joi.array().items(joi.object().keys({
				impurities: joi.number().optional(),
				PackagingMaterial: joi.number().optional(),
			})),
			elements: joi.array().items(joi.object().keys({
				element: joi.string().optional(),
				mass: joi.number().optional(),
			})),
			descriptionOfMethodologyShare: joi.string().optional(),
			descriptionOfMethodologyChemicalComposition: joi.string().optional(),
			massOfExternalJacket: joi.number().optional(),
			massOfOuterCasings: joi.number().optional(),
		}),
	})),
	additives: joi.array().items(joi.object().keys({
		type: joi.string().optional(),
		weight: joi.number().optional(),
		chemicalComposition: joi.array().items(joi.object().keys({
			element: joi.string().optional(),
			weight: joi.number().optional(),
		})),
	})),
	outputFraction: joi.array().items(joi.object().keys({
		siteRef: joi.string(),
		data: joi.array().items(joi.object().keys({
			element: joi.string().optional(),
			mass: joi.number().optional(),
			classification: joi.string().optional(),
			replacedMaterial: joi.string().optional(),
			elementCompound: joi.string().optional(),
			shareOutputFraction: joi.string().optional(),
		})),
	})),
	recyclingEfficiency: joi.object().keys({
		calculatedEfficiency: joi.number().optional(),
	}),
	additionalInformation: joi.object().keys({
		files: joi.array().items(joi.object().keys({
			type: joi.string(),
		})),
		additionalInformation: joi.string().optional(),
	}),
};

const filedData = {
	information: joi.object().keys({
		reportingYear: joi.number().required(),
		recyclingProcess: joi.string().required(),
		name: joi.string().required(),
		receiver: joi.string().required(),
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
				PackagingMaterial: joi.number().required(),
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
		type: joi.string().required(),
		weight: joi.number().required(),
		chemicalComposition: joi.array().items(joi.object().keys({
			element: joi.string().required(),
			weight: joi.number().required(),
		})),
	})),
	outputFraction: joi.array().items(joi.object().keys({
		siteRef: joi.string(),
		data: joi.array().items(joi.object().keys({
			element: joi.string().required(),
			mass: joi.number().required(),
			classification: joi.string().required(),
			replacedMaterial: joi.string().required(),
			elementCompound: joi.string().required(),
			shareOutputFraction: joi.string().required(),
		})),
	})),
	recyclingEfficiency: joi.object().keys({
		calculatedEfficiency: joi.number().required(),
	}),
	additionalInformation: joi.object().keys({
		files: joi.array().items(joi.object().keys({
			type: joi.string(),
		})),
		additionalInformation: joi.string().optional(),
	}),
};

const schema = joi.object().keys({
	data: joi.alternatives().when("meta.status", { is: REPORT_STATUS.FILED, then: joi.object().keys(filedData), otherwise: joi.object().keys(savedData) }),
	meta: joi.object().keys({
		approvedCompanies: joi.array().items(joi.string()).optional(),
		status: joi.string().valid([REPORT_STATUS.FILED, REPORT_STATUS.SAVED]).optional(),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
