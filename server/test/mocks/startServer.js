const mockMongoose = require("./mockMongoose");
const createTestUser = require("./createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");

module.exports = async() => {
	mockery.enable({ warnOnUnregistered: false });
	mockery.registerMock("nodemailer", nodemailerMock);

	const mongoServer = await mockMongoose();
	await createTestUser();

	const server = require("../../index");
	const reset = () => {
		nodemailerMock.mock.reset();
	};
	const closeServer = () => {
		mockery.deregisterAll();
		mockery.disable();
		mongoServer.stop();
	};

	return { mongoServer, server, reset, closeServer, nodemailerMock };
};
