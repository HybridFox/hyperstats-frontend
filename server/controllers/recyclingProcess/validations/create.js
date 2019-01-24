const joi = require("joi");

module.exports = joi.object().keys({
	body: {
		data: joi.object().keys({
			name: joi.string().required(),
			steps: joi.array().items(joi.object().keys({
				precedingStep: joi.string().allow('').optional(),
				description: joi.string(),
				site: joi.string(),
				methodOfProcessing: joi.string(),
				qualitativeDescription: joi.object().keys({
					text: joi.string(),
					asset: joi.string(),
				}),
				schematicOverview: joi.string(),
			})),
		}),
	},
	query: {}
});
