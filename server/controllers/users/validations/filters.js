const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	type: Joi.string().valid(["R", "RP", "CO"]).optional(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
