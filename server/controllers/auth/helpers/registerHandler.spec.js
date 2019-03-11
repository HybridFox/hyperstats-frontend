const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");
const errors = require("../../../helpers/errorHandler");

should();
use(chaiAsPromised);

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
		username: "validuser@example.com",
		password: "validPassword",
		firstname: "firstname",
		lastname: "lastname",
	})).to.eventually.rejectedWith(errors.EmailAlreadyTaken));

	it("Register a new user", () => expect(registerHandler({
		email: "validuser2@example.com",
		username: "validuser2@example.com",
		password: "validPassword",
		firstname: "firstname",
		lastname: "lastname",
	})).to.eventually.be.fulfilled);

	it("Should not fail when user register itself twice before validation", async() => {
		const userToTest = {
			email: "validuser4@example.com",
			username: "validuser4@example.com",
			password: "validPassword4",
			firstname: "firstname4",
			lastname: "lastname4",
		};
		await registerHandler(userToTest);
		const response = await registerHandler(userToTest);

		expect(response).to.be.an("object");
		expect(response.data).to.be.an("object");
		expect(response.data.email).to.equal("validuser4@example.com");
		expect(response.data.username).to.equal("validuser4@example.com");
		expect(response.meta).to.be.an("object");

		const sentMail = nodemailerMock.mock.sentMail();

		expect(sentMail).to.have.lengthOf(2);
		expect(sentMail[0].to).to.equal("validuser4@example.com");
		expect(sentMail[1].to).to.equal("validuser4@example.com");
	});
});
