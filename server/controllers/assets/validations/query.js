const Joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	download: Joi.any(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
