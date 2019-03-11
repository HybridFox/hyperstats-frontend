const joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = joi.object().keys({
	user: joi.object().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
