const joi = require("joi");

module.exports = joi.object().keys({
	body: joi.object().keys({
		firstname: joi.string().required(),
		lastname: joi.string().required(),
	}),
	query: joi.object(),
});
