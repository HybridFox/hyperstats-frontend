const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const config = require(`${process.cwd()}/config`);

module.exports = session({
	saveUninitialized: true,
	resave: true,
	cookie: {
		secure: false,
		httpOnly: false,
		domain: config.server.cookies.domain,
		maxAge: config.server.cookies.maxAge,
	},
	name: config.server.cookies.name,
	secret: config.server.cookies.secret,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		collection: "session"
	})
});
