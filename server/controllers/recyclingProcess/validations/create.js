const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	data: Joi.object().keys({
		name: Joi.string().required(),
		steps: Joi.array().items(Joi.object().keys({
			uuid: Joi.string().allow(null),
			precedingStep: Joi.string().allow("").optional(),
			description: Joi.string(),
			site: Joi.string(),
			methodOfProcessing: Joi.string(),
			qualitativeDescription: Joi.object().keys({
				text: Joi.string(),
				asset: Joi.object().keys({
					id: Joi.string().allow("", null),
					mimetype: Joi.string().allow("", null),
					uploadDate: Joi.string().allow("", null),
					originalname: Joi.string().allow("", null),
				}).optional().allow(null),
			}),
			schematicOverview: Joi.object().keys({
				id: Joi.string().allow("", null),
				mimetype: Joi.string().allow("", null),
				uploadDate: Joi.string().allow("", null),
				originalname: Joi.string().allow("", null),
			}).optional().allow(null),
		})),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
