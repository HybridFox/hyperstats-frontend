const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const docs = require("@studiohyperdrive/api-docs");
const helmet = require("helmet");
const express = require("express");
const path = require("path");

const session = require("./session");

module.exports = (app) => {
	app.use(cookieParser());

	app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
	app.use(bodyParser.json({ limit: "50mb", keepExtensions: true }));

	app.use(session);

	app.use(express.static(path.resolve(process.cwd(), "dist")));

	app.use("/server", docs({
		path: "server/routes",
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
