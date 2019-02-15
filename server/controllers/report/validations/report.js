const joi = require("joi");
const { schemas } = require("../../../helpers/validation");
const REPORT_STATUS = require("../helpers/const").REPORT_STATUS;

const schema = joi.object().keys({
	data: joi.object({
		information: {
			reportingYear: joi.number().required(),
			recyclingProcess: joi.string().required(),
			name: joi.string().required(),
			receiver: joi.string().required(),
		},
		inputFraction: joi.array().items(joi.object({
			siteRef: joi.string(),
			data: {
				processChemistry: joi.string().required(),
				weightInput: joi.number().required(),
				shareOfBatteryType: joi.number().required(),
				weightBatteryType: joi.number().required(),
				excessMaterialReceived: joi.array().items(joi.object({
					impurities: joi.number().required(),
					PackagingMaterial: joi.number().required(),
				})),
				elements: joi.array().items(joi.object({
					element: joi.string().required(),
					mass: joi.number().required(),
				})),
				descriptionOfMethodologyShare: joi.string().required(),
				descriptionOfMethodologyChemicalComposition: joi.string().required(),
				massOfExternalJacket: joi.number().required(),
				massOfOuterCasings: joi.number().required(),
			},
		})),
		additives: joi.array().items(joi.object({
			type: joi.string().required(),
			weight: joi.number().required(),
			chemicalComposition: joi.array().items(joi.object({
				element: joi.string().required(),
				weight: joi.number().required(),
			})),
		})),
		outputFraction: joi.array().items(joi.object({
			siteRef: joi.string(),
			data: joi.array().items(joi.object({
				element: joi.string().required(),
				mass: joi.number().required(),
				classification: joi.string().required(),
				replacedMaterial: joi.string().required(),
				elementCompound: joi.string().required(),
				shareOutputFraction: joi.string().required(),
			})),
		})),
		recyclingEfficiency: {
			calculatedEfficiency: joi.number().required(),
		},
		additionalInformation: {
			files: joi.array().items(joi.object({
				type: joi.string(),
			})),
			additionalInformation: joi.string().required(),
		},
	}),
	meta: joi.object({
		approvedCompanies: joi.array().items(joi.string()).optional(),
		status: joi.string().valid(REPORT_STATUS).optional(),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
