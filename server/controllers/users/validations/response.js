const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	_id: Joi.any().required(),
	data: Joi.object().keys({
		email: Joi.string().required(),
		lastname: Joi.string(),
		firstname: Joi.string(),
	}),
	meta: Joi.object().keys({
		status: Joi.any(),
		isAdmin: Joi.boolean(),
		created: Joi.any(),
		lastUpdated: Joi.any(),
	}),

});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
