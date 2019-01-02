module.exports = function ValidationError(message, validation = null) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.validation = validation;
};

require("util").inherits(module.exports, Error);
