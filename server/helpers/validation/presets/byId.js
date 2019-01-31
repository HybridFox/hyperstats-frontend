const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const options = require("./options");

const schema = Joi.object().keys({
	id: Joi.objectId().required(),
});

module.exports = {
	options: options.stripUnknown,
	schema,
};
