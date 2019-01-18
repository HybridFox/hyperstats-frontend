const login = require("./login");
const logout = require("./logout");
const profile = require("./profile");
const register = require("./register");
const requestPasswordReset = require("./requestPasswordReset");
const resetPassword = require("./resetPassword");
const verify = require("./verify");

module.exports = {
	login,
	logout,
	profile,
	register,
	requestPasswordReset,
	resetPassword,
	verify,
};
