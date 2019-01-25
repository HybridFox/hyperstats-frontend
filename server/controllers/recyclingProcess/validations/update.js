const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	data: Joi.object().keys({
		name: Joi.string().required(),
		steps: Joi.array().items(Joi.object().keys({
			precedingStep: Joi.string().allow("").optional(),
			description: Joi.string(),
			site: Joi.string(),
			methodOfProcessing: Joi.string(),
			qualitativeDescription: Joi.object().keys({
				text: Joi.string(),
				asset: Joi.string(),
			}),
			schematicOverview: Joi.string(),
		})),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
