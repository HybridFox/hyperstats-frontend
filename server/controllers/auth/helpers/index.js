const loginHandler = require("./loginHandler");
const registerHandler = require("./registerHandler");
const requestPasswordReset = require("./requestPasswordReset");
const resetPassword = require("./resetPassword");
const verifyHandler = require("./verifyHandler");
const resendValidateMail = require("./resendValidateMail");

module.exports = {
	loginHandler,
	registerHandler,
	requestPasswordReset,
	resetPassword,
	verifyHandler,
	resendValidateMail,
};


