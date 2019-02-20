const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	data: Joi.object().keys({
		email: Joi.string().required(),
		lastname: Joi.string().required(),
		firstname: Joi.string().required(),
		company: Joi.any().optional(),
	}),
	meta: Joi.object().keys({
		status: Joi.object().keys({
			type: Joi.string().valid(["ACTIVATED", "DEACTIVATED"]).required(),
		}).required(),
		isAdmin: Joi.boolean().required(),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
