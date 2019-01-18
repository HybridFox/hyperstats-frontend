const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");

should();
use(chaiAsPromised);

const loginHandler = require("./loginHandler");

describe("RegisterHandler", () => {
	let registerHandler;
	let mongoServer;

	before(async() => {
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock("nodemailer", nodemailerMock);

		mongoServer = await mockMongoose();
		await createTestUser();

		registerHandler = require("./registerHandler");
	});

	afterEach(() => nodemailerMock.mock.reset());

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
		mongoServer.stop();
	});

	it("Should error email is already registered", () => expect(registerHandler({
		email: "validuser@example.com",
		password: "validPassword",
		firstname: "firstname",
		lastname: "lastname",
	})).to.eventually.rejectedWith(Error));

	it("Register a new user", () => expect(registerHandler({
		email: "validuser2@example.com",
		password: "validPassword",
		firstname: "firstname",
		lastname: "lastname",
	})).to.eventually.be.fulfilled);

	it("Should not be able to login user after registration (validation required)", async() => {
		const userToTest = {
			email: "validuser3@example.com",
			password: "validPassword3",
			firstname: "firstname3",
			lastname: "lastname3",
		};
		await registerHandler(userToTest);

		return expect(loginHandler(userToTest.email, userToTest.password)).to.eventually.rejectedWith(Error);
	});
});
