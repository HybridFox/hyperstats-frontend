const { curry } = require("ramda");
const ValidationHelper = require("../../helpers/validation");
const Errors = require("../../helpers/errorHandler");

module.exports = curry((origin, preset, error, req, res, next) => {
	req.data[origin] = ValidationHelper.validator(preset, error || Errors.ObjectValidationFailed, req.data[origin]);
	next();
});
