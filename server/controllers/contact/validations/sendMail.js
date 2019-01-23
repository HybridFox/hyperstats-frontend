const joi = require("joi");

module.exports = joi.object().keys({
	body: joi.object().keys({
		email: joi.string().email().required(),
		subject: joi.string().required(),
		body: joi.string().required(),
	}),
});
