const joi = require("joi");

module.exports = joi.object().keys({
	body: joi.object().keys({
		name: joi.string().required(),
		address: joi.object().keys({
			street: joi.string().required(),
			number: joi.string().required(),
			box: joi.string().optional(),
			zipCode: joi.string().required(),
			city: joi.string().required(),
			country: joi.string().required(),
		}),
	}),
});

