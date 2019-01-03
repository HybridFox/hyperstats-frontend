const joi = require("joi");

module.exports = joi.object().keys({
	body: joi.object().keys({
		email: joi.string().email(),
		password: joi.string(),
	}),
});
