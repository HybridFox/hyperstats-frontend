const Joi = require("joi");
const { curry } = require("ramda");
const ValidationError = require("../validationError");
const presetValidators = require("./presets");

/**
 * @module Validation
 */

/**
 * @function validator Object Joi validator
 * @param {Preste} preset Preset
 * @param {Object|String} onFailError On fail error object/string
 * @param {Any} source Item to be validated
 */

const validator = (preset, onFailError, source) => {
	const validation = Joi.validate(source, preset.schema, preset.options);

	if (validation.error) {
		throw new ValidationError(onFailError, validation.error);
	}

	// Return value from validation, for casting etc
	return validation.value;
};

/**
 * @function middleware Handles passport login
 * @param {JoiSchema} schema Joi Schema
 * @param {Boolean} allowUnknown Specify if unused props are allowed
 */
const middleware = (schema, allowUnknown = true) => (req, res, next) => {
	const validation = Joi.validate({ body: req.body, query: req.query }, schema, { allowUnknown });

	if (validation.error) {
		return res.status(400).json(validation.error);
	}

	next();
};

module.exports = {
	validator: curry(validator),
	middleware: middleware,
	schemas: {
		presets: presetValidators,
	},
};
