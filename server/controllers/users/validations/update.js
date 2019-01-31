const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	data: Joi.object().keys({
		email: Joi.string().required(),
		lastname: Joi.string().required(),
		firstname: Joi.string().required(),
	}),
	meta: Joi.object().keys({
		status: Joi.any().required(),
		isAdmin: Joi.boolean().required(),
	}),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
