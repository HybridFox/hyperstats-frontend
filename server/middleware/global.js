const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const docs = require("@studiohyperdrive/api-docs");
const helmet = require("helmet");

const session = require("./session");

require("./passportSetup");

module.exports = (app) => {
	app.use(cookieParser());

	app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
	app.use(bodyParser.json({ limit: "50mb", keepExtensions: true }));

	app.use(session);

	// app.use(passportSetup());

	app.use(docs({
		path: "./routes",
		NODE_ENV: [
			"local",
			"test",
			"development",
		],
	}));

	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.ieNoOpen());
	app.use(helmet.hidePoweredBy());
};
