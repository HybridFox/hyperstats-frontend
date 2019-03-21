const joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = joi.object().keys({
	type: joi.alternatives([
		joi.string(),
		joi.array().items(joi.string()).optional(),
	]),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
