const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	data: Joi.object().keys({
		name: Joi.string().required(),
		steps: Joi.array().items(Joi.object().keys({
			uuid: Joi.string(),
			precedingStep: Joi.string().allow("").optional(),
			description: Joi.string(),
			site: Joi.string(),
			methodOfProcessing: Joi.string(),
			qualitativeDescription: Joi.object().keys({
				text: Joi.string(),
				asset: Joi.object().keys({
					id: Joi.string().allow(""),
					mimetype: Joi.string().allow(""),
					uploadDate: Joi.string().allow(""),
					originalname: Joi.string().allow(""),
				}).optional(),
			}),
			schematicOverview: Joi.object().keys({
				id: Joi.string().allow("", null),
				mimetype: Joi.string().allow("", null),
				uploadDate: Joi.string().allow("", null),
				originalname: Joi.string().allow("", null),
			}).optional(),
		})),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
