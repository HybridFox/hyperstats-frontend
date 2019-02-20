const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	_id: Joi.any().required(),
	data: Joi.object().keys({
		email: Joi.string().required(),
		lastname: Joi.string(),
		firstname: Joi.string(),
		company: Joi.any().optional(),
	}),
	meta: Joi.object().keys({
		status: Joi.object().keys({
			type: Joi.string().valid(["ACTIVATED", "DEACTIVATED"]).required(),
		}).required(),
		isAdmin: Joi.boolean(),
		created: Joi.any(),
		lastUpdated: Joi.any(),
	}),

});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
