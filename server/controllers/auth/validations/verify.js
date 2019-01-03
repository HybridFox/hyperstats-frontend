const joi = require("joi");

module.exports = joi.object().keys({
	query: joi.object().keys({
		token: joi.string().required(),
	}),
});
