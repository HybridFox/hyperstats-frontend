const joi = require("joi");

module.exports = joi.object().keys({
	body: joi.object().keys({
		token: joi.string().required(),
		password: joi.string().required(),
	}),
});
