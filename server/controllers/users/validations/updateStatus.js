const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	status: Joi.object().keys({
		type: Joi.string().valid(["ACTIVATED", "DEACTIVATED", "PENDING"]).required(),
	}).required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
