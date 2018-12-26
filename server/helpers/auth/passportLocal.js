const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const loginHandler = require("./loginHandler");
const registerHandler = require("./registerHandler");

passport.use("local-login", new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true,
	session: false,
}, loginHandler));

passport.use("local-register", new LocalStrategy({
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true,
	session: false,
}, registerHandler));

passport.serializeUser((user, callback) => callback(null, user));
