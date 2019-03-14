const Validator = require("../../../../helpers/validation");
const errors = require("../../../../helpers/errorHandler");
const Validations = require("../../validations");

module.exports = (data) => {
	return Validator.validator(Validations.response, errors.ObjectValidationFailed, data);
};
