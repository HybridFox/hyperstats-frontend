const createTestUser = require("./createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");

module.exports = async() => {
	mockery.enable({ warnOnUnregistered: false });
	mockery.registerMock("nodemailer", nodemailerMock);

	const server = require("../../index");

	await createTestUser();

	const reset = () => {
		nodemailerMock.mock.reset();
	};
	const closeServer = () => {
		mockery.deregisterAll();
		mockery.disable();
	};

	return { server, reset, closeServer, nodemailerMock };
};
