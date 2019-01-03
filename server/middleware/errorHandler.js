const ErrorHelper = require("../helpers/errorHandler");

const errorHandler = (err, req, res, next) => {
	// Check if there is an error
	if (!err) {
		next();
	}

	// Check if the error is of type string
	// If so, "convert" it to an error
	if (typeof err === "string") {
		err = new Error(err);
	}
	// Do not send multiple responses
	if (res.headersSent) {
		return;
	}

	const { statusCode, msg, stack } = ErrorHelper.create(err);

	// Return response
	res.status(statusCode).json({
		err: msg,
		stack, // Stack is optional. Will only be available if the stack is defined.
	});
};

module.exports = errorHandler;
