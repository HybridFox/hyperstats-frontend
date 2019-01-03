const passport = require("passport");

require("../helpers/auth");

/**
 * @function passportSetup Initialize passport and tell it to use the session
 */
module.exports = () => {
	const init = passport.initialize();

	return (req, res, next) => {
		init(req, res, next);

		return next();
	};
};
