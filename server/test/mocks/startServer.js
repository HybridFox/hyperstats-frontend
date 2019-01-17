const createTestUser = require("../helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");
const removeTestUsers = require("../helpers/removeTestUsers");

module.exports = async() => {
	mockery.enable({ warnOnUnregistered: false });
	mockery.registerMock("nodemailer", nodemailerMock);

	const server = require("../../index");

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
