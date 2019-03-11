const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");

should();
use(chaiAsPromised);

describe("Verify handler", () => {
	let mongoServer;
	let verifyHandler;

	before(async() => {
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock("nodemailer", nodemailerMock);

		verifyHandler = require("./verifyHandler");

		mongoServer = await mockMongoose();
		await createTestUser({
			isValidated: false,
		});
	});

	afterEach(() => nodemailerMock.mock.reset());

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
		mongoServer.stop();
	});

	it("Should fail to verify the user if the token is wrong", () => {
		return expect(verifyHandler("invalidToken")).to.be.rejectedWith(Error);
	});

	it("Should validate the user if the token is ok", () => {
		return expect(verifyHandler("someToken")).to.be.fulfilled;
	});

	it("Should fail to verify the user if the user is already validated", () => {
		return expect(verifyHandler("someToken")).to.be.rejectedWith(Error);
	});
});
