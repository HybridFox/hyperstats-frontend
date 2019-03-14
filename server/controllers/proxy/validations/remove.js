const joi = require("joi");
const { schemas } = require("../../../helpers/validation");

const schema = joi.object().keys({
	proxy: joi.string().required(),
	recyclingProcesss: joi.string().required(),
	year: joi.number().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
