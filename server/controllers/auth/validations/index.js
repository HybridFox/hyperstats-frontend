const login = require("./login");
const register = require("./register");
const requestPasswordReset = require("./requestPasswordReset");
const resetPassword = require("./resetPassword");
const verify = require("./verify");
const resendValidateMail = require("./resendValidateMail");

module.exports = {
	login,
	register,
	requestPasswordReset,
	resetPassword,
	verify,
	resendValidateMail,
};
