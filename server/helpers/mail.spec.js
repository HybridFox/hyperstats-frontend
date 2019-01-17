const { expect, should, use } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mockery = require("mockery");
const nodemailerMock = require("nodemailer-mock");
const { join } = require("path");

should();
use(chaiAsPromised);

const testMailConfig = {
	to: "test@example.com",
	subject: "some subject",
	template: "<div>Welcome {{name}}</div>",
	data: {
		name: "Jef",
	},
};

describe("mail", () => {
	let mail;

	before(() => {
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock("nodemailer", nodemailerMock);

		mail = require("./mail");
	});

	afterEach(() => nodemailerMock.mock.reset());

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

	it("should render the template from a string & send an email", async() => {
		await mail(testMailConfig);

		const sentMail = nodemailerMock.mock.sentMail();

		expect(sentMail).to.have.lengthOf(1);
		expect(sentMail[0]).to.have.property("to", "test@example.com");
		expect(sentMail[0]).to.have.property("subject", "some subject");
		expect(sentMail[0]).to.have.property("html", "<div>Welcome Jef</div>");
	});

	it("should render the template from a path & send an email", async() => {
		await mail({
			...testMailConfig,
			templatePath: join(process.cwd(), "test/templates/test.html"),
		});

		const sentMail = nodemailerMock.mock.sentMail();

		expect(sentMail).to.have.lengthOf(1);
		expect(sentMail[0]).to.have.property("to", "test@example.com");
		expect(sentMail[0]).to.have.property("subject", "some subject");
		expect(sentMail[0].html).to.be.an("string");
		expect(sentMail[0].html.trim()).to.equal("<div>Welcome Jef</div>");
	});

	it("should return an error on mail failure", () => {
		const err = "Mail failed!";
		nodemailerMock.mock.shouldFailOnce();
		nodemailerMock.mock.failResponse(err);

		return expect(mail(testMailConfig)).to.eventually.rejectedWith("Mail failed!");
	});
});
