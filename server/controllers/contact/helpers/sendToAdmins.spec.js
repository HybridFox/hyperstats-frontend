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
		await sendToAdmins({ email: "reply-email@example.com", subject: "Some subject", body: "Some body" });

		// get the array of emails we sent
		const sentMail = nodemailerMock.mock.sentMail();

		expect(sentMail).to.have.lengthOf(2);

		const mail1 = sentMail.find((mail) => mail.to === "validuser@example.com");
		const mail2 = sentMail.find((mail) => mail.to === "test2@example.com");

		expect(mail1).to.be.an("object");
		expect(mail1.to).to.equal("validuser@example.com");
		expect(mail1.subject).to.equal("Rare | New contact message");
		expect(mail1.html).to.have.string("<h1>New Contact message!</h1>");

		expect(mail2).to.be.an("object");
		expect(mail2.to).to.equal("test2@example.com");
		expect(mail2.subject).to.equal("Rare | New contact message");
		expect(mail2.html).to.have.string("<h1>New Contact message!</h1>");
	});
});
