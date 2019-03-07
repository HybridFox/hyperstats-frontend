const { pathOr } = require("ramda");
const errors = {
	ObjectValidationFailed: "OBJECT_VALIDATION_FAILED",
	MissingAuthorization: "MISSING_AUTHORIZATION",
	Forbidden: "FORBIDDEN",
	ItemNotFound: "ITEM_NOT_FOUND",
	ItemCannotBeUpdated: "ITEM_CANNOT_BE_UPDATED",
	PageNotFound: "PAGE_NOT_FOUND",
	EmailAlreadyTaken: "EMAIL_ALREADY_TAKEN",
	FileIsRequired: "FILE_IS_REQUIRED",
};

const errorHandler = (err) => {
	let statusCode;
	let msg = "";

	// If the err name is defined, we should not check for our own custom errors
	if (err.name && err.name !== "Error" && err.name !== "ValidationError") {
		statusCode = 400;
		msg = `${err.name} occured. See the stack for more information.`;

		return { statusCode, msg, stack: err.stack.split(/\r?\n/) };
	}

	// Get the correct message
	switch (err.message) {
		case errors.ObjectValidationFailed:
			statusCode = 400;
			msg = pathOr([], ["validation", "details"], err).map(detail => {
				return {
					err: detail.message,
				};
			});
			break;
		case errors.MissingAuthorization:
			statusCode = 401;
			msg = "Not authorized.";
			break;
		case errors.Forbidden:
			statusCode = 403;
			msg = "Forbidden.";
			break;
		case errors.ItemNotFound:
			statusCode = 404;
			msg = "Item not found.";
			break;
		case errors.ItemCannotBeUpdated:
			statusCode = 422;
			msg = "Item cannot be updated.";
			break;
		case errors.PageNotFound:
			statusCode = 404;
			msg = "Page not found.";
			break;
		case errors.EmailAlreadyTaken:
			statusCode = 409;
			msg = "Email already taken.";
			break;
		case errors.FileIsRequired:
			statusCode = 400;
			msg = `"file" is required`;
			break;

		default:
			statusCode = 500;
			msg = err.message || "Something unexpected happened.";
	}

	return { statusCode, msg };
};

module.exports = errors;
module.exports.create = errorHandler;
