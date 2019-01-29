const joi = require("joi");

module.exports = joi.object().keys({
	body: joi.object().keys({
		name: joi.string().required(),
		address: joi.object().keys({
			street: joi.string().required(),
			number: joi.string().required(),
			box: joi.string().allow("").optional(),
			zipCode: joi.string().required(),
			city: joi.string().required(),
			country: joi.string().required(),
		}).required(),
		contactPerson: joi.object().keys({
			name: joi.string().required(),
			function: joi.string().required(),
			phone: joi.string().allow("").optional(),
			mobile: joi.string().allow("").optional(),
			email: joi.string().email().required(),
		}).required(),
	}),
});
