const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const requestPasswordReset = require("./requestPasswordReset");
const resetPassword = require("./resetPassword");
const verify = require("./verify");

module.exports = {
	login,
	logout,
	register,
	requestPasswordReset,
	resetPassword,
	verify,
};
