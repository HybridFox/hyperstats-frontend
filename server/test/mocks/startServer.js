const createTestUser = require("../helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");
const removeTestUsers = require("../helpers/removeTestUsers");
const testCompanyhelper = require("../helpers/testCompany");

module.exports = async() => {
	mockery.enable({ warnOnUnregistered: false });
	mockery.registerMock("nodemailer", nodemailerMock);

	await testCompanyhelper.remove("5c485d0029abc50032947f91");
	await createTestUser();

	const server = require("../../index");

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
