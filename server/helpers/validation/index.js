const Joi = require("joi");
const { curry } = require("ramda");
const ValidationError = require("../validationError");

const presetValidators = require("./presets");
const authValidators = require("./auth");

const validator = (preset, onFailError, source) => {
	const validation = Joi.validate(source, preset.schema, preset.options);

	if (validation.error) {
		throw new ValidationError(onFailError, validation.error);
	}

	// Return value from validation, for casting etc
	return validation.value;
};

const bodyMiddleware = (schema, req, res, next) => {
	const validation = Joi.validate(req.body, schema);

	if (validation.error) {
		return res.status(400).json(validation.error);
	}

	next();
}

module.exports = {
	validator: curry(validator),
	bodyMiddleware: curry(bodyMiddleware),
	schemas: {
		presets: presetValidators,
		auth: authValidators,
	},
};
