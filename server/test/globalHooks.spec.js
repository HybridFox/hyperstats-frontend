const CompanyModel = require("../models/company");
const UserModel = require("../models/user");
const mockery = require("mockery");
const config = require("../config");

before(async() => {
	mockery.enable();
	mockery.registerMock("mongoose", require("mongoose"));

	const mongoose = require("mongoose");
	const options = {
		useNewUrlParser: true,
	};

	mongoose.connect(config.server.mongo.url, options);

	await new Promise((resolve) => mongoose.connection.on("connected", resolve));

	console.log("Cleaning up DB ..."); // eslint-disable-line no-console

	await CompanyModel.remove({}).exec();
	await UserModel.remove({}).exec();

	console.log("DB cleaned!"); // eslint-disable-line no-console

	mockery.deregisterAll();
	mockery.disable();
});
