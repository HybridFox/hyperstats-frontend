const joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = joi.object().keys({
	username: joi.string().email().required().lowercase(),
	password: joi.string().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};

