const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	status: Joi.string().valid(["ACTIVATED", "DEACTIVATED"]).required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
