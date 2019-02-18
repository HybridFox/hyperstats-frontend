const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const nodemailerMock = require("nodemailer-mock");
const UserModel = require("../../../models/user");
const mockery = require("mockery");

should();
use(chaiAsPromised);

describe("Request password reset", () => {
	let requestPasswordReset;
	let mongoServer;

	before(async() => {
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock("nodemailer", nodemailerMock);

		mongoServer = await mockMongoose();
		await createTestUser();

		requestPasswordReset = require("./requestPasswordReset");
	});

	afterEach(() => nodemailerMock.mock.reset());

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
		mongoServer.stop();
	});

	it("Should fail when using an invalid email", () => {
		return expect(requestPasswordReset("invalid-email@example.com")).to.be.rejectedWith("ITEM_NOT_FOUND");
	});

	it("Should prepare a password reset when a valid email is passed", async() => {
		const token = await expect(requestPasswordReset("validuser@example.com")).to.be.fulfilled;

		const user = await UserModel.findOne({ "data.email": "validuser@example.com" }).exec();

		expect(user).to.be.an("object");

		const userObj = user.toObject();

		expect(userObj).to.be.an("object");
		expect(userObj.meta).to.be.an("object");
		expect(userObj.meta.passwordReset).to.be.an("object");
		expect(userObj.meta.passwordReset.token).to.equal(token).and.to.not.equal("someToken");
		expect(new Date(userObj.meta.passwordReset.expireDate).getTime()).to.be.greaterThan(new Date().getTime() + (86400000 * 7) - 20000); // 20 sec buffer
		expect(new Date(userObj.meta.passwordReset.expireDate).getTime()).to.be.lessThan(new Date().getTime() + (86400000 * 7) + 20000); // 20 sec buffer

		// get the array of emails we sent
		const sentMail = nodemailerMock.mock.sentMail();

		expect(sentMail).to.have.lengthOf(1);
		expect(sentMail[0]).to.be.an("object");
		expect(sentMail[0].to).to.equal("validuser@example.com");
		expect(sentMail[0].subject).to.equal("Rare - Reset password");
	});
});
