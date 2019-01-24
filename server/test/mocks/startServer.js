const createTestUser = require("../helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");
const removeTestUsers = require("../helpers/removeTestUsers");
const mongoose = require("mongoose");

module.exports = async() => {
	mockery.enable({ warnOnUnregistered: false });
	mockery.registerMock("nodemailer", nodemailerMock);

	const server = require("../../index");

	if (mongoose.connection.readyState !== 1) {
		await new Promise((resolve, reject) => {
			mongoose.connection.on("connected", resolve);
			mongoose.connection.on("error", reject);
		});
	}

	await createTestUser();

	const reset = () => {
		nodemailerMock.mock.reset();
	};
	const closeServer = async() => {
		mockery.deregisterAll();
		mockery.disable();

		await removeTestUsers(["validuser@example.com"]);
	};

	return { server, reset, closeServer, nodemailerMock };
};
