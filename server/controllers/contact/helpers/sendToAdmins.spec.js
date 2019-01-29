const { expect } = require("chai");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");


describe("Send to admins", () => {
	let sendToAdmins;
	let mongoServer;

	before(async() => {
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock("nodemailer", nodemailerMock);

		mongoServer = await mockMongoose();
		await createTestUser({
			isAdmin: true,
		});
		await createTestUser({
			email: "test2@example.com",
			isAdmin: true,
		});

		sendToAdmins = require("./sendToAdmins");
	});

	afterEach(() => nodemailerMock.mock.reset());

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
		mongoServer.stop();
	});

	it("Should send contact emails to admins", async() => {
		await sendToAdmins({ email: "reply-email@example.com", subject: "Rare | New contact message", body: "Some body" });

		// get the array of emails we sent
		const sentMail = nodemailerMock.mock.sentMail();

		expect(sentMail).to.have.lengthOf(2);

		expect(sentMail[0]).to.be.an("object");
		expect(sentMail[0].to).to.equal("validuser@example.com");
		expect(sentMail[0].subject).to.equal("Rare | New contact message");
		expect(sentMail[0].html).to.indexOf("<h1>New Contact message!</h1>");

		expect(sentMail[1]).to.be.an("object");
		expect(sentMail[1].to).to.equal("test1@example.com");
		expect(sentMail[1].subject).to.equal("Rare | New contact message");
		expect(sentMail[1].html).to.indexOf("<h1>New Contact message!</h1>");
	});
});
