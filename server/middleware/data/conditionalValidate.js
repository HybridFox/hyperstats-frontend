const { curryN } = require("ramda");

const validate = require("./validate");
const profileHelper = require("../../helpers/profile");
const { ADMIN, NON_ADMIN } = require("../../config/userTypes");

module.exports = curryN(4, (isAdmin, ...args) => (req, res, next) => {
	const userType = profileHelper.isAdmin(req) ? ADMIN : NON_ADMIN;

	if (userType === isAdmin) {
		return validate(...args)(req, res, next);
	}

	next();
});
