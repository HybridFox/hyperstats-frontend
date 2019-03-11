const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");

should();
use(chaiAsPromised);

describe("Resend validate mail", () => {
	let resendValidateMail;
	let mongoServer;

	before(async() => {
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock("nodemailer", nodemailerMock);

		mongoServer = await mockMongoose();
		await createTestUser();

		resendValidateMail = require("./resendValidateMail");
	});

	afterEach(() => nodemailerMock.mock.reset());

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
		mongoServer.stop();
	});

	it("Should resend validation email when requested", async() => {
		const userToTest = {
			user: {
				email: "validuser@example.com",
				username: "validuser@example.com",
				password: "validPassword4",
				firstname: "firstname4",
				lastname: "lastname4",
				validation: {
					token: "someToken",
				},
			},
		};

		await expect(resendValidateMail(userToTest)).to.be.fulfilled;

		const sentMail = nodemailerMock.mock.sentMail();

		expect(sentMail).to.have.lengthOf(1);
		expect(sentMail[0]).to.be.an("object");
		expect(sentMail[0].to).to.equal("validuser@example.com");
		expect(sentMail[0].subject).to.equal("Rare - Confirm registration");
	});
});
