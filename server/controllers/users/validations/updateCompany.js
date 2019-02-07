const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { schemas } = require("../../../helpers/validation");

const schema = Joi.object().keys({
	company: Joi.objectId().required(),
});

module.exports = {
	options: schemas.presets.options.stripUnknown,
	schema,
};
