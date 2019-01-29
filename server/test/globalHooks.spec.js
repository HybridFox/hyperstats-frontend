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

	await CompanyModel.remove({ _id: { $ne: "5c485d0029abc50032947f91" } }).exec();
	await UserModel.remove({ "data.firstname": "__firstname_test-user__remove_identifier__" }).exec();

	console.log("DB cleaned!"); // eslint-disable-line no-console

	mockery.deregisterAll();
	mockery.disable();
});
