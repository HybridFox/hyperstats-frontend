const Validator = require("../../../../helpers/validation");
const Errors = require("../../../../helpers/errorHandler");
const Validations = require("../../validations");

module.exports = (data) => {
	return Validator.validator(Validations.response, Errors.ObjectValidationFailed, data);
};
