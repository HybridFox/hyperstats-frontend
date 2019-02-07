const joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = joi.object().keys({
	token: joi.string().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};

