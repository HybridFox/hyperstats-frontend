const joi = require("joi");

module.exports = joi.object().keys({
	body: joi.object().keys({
		email: joi.string().email().required(),
		password: joi.string().required(),
		firstname: joi.string().required(),
		lastname: joi.string().required(),
		companyName: joi.string().allow("").optional(),
	}),
	query: joi.object(),
});
