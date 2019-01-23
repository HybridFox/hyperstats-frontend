
const stringifyObject = (input) => {
	try {
		return (JSON.stringify(input)).toString();
	} catch (err) {
		return input;
	}
};

/**
 * @class ResponseError
 * @extends Error
 */
module.exports = class ResponseError extends Error {
	/**
	 * Create a ResponseError
	 * @param {Object} errorOptions
	 * @param {Number} errorOptions.type Error identifier
	 * @param {String} [errorOptions.msg] Message to return to the user
	 * @param {Any} [errorOptions.error] Error object
	 */
	constructor({ type, msg, error }) {
		super(
			`(Internal) ${msg} | ${type}

			${stringifyObject(error)}`
		);

		this.type = type;
		this.msg = msg;
		this.error = error;

		Error.captureStackTrace(this, ResponseError);
	}
};
