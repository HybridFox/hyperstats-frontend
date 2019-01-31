const joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = joi.object().keys({
	firstname: joi.string().required(),
	lastname: joi.string().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};

