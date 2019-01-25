const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	id: Joi.string().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
