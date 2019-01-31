const joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = joi.object().keys({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};

