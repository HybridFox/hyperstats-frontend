const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const UserModel = require("../../../models/user");

should();
use(chaiAsPromised);

const resetPassword = require("./resetPassword");

describe("Reset password", () => {
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();

		// default user
		await createTestUser();

		// expired user
		await createTestUser({
			email: "testuser2@example.com",
			firstname: "testuser2",
			passwordResetExpire: new Date(), // Will be expired
			passwordResetToken: "secondPasswordToken",
		});
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should fail to reset password when passing an invalid token", () => {
		return expect(resetPassword("newPassword", "invalidToken")).to.be.rejectedWith(Error);
	});

	it("Should fail to reset password when a valid token has expired", () => {
		return expect(resetPassword("newPassword", "secondPasswordToken")).to.be.rejectedWith(Error);
	});

	it("Should reset the password when a valid unexpired token is passed", async() => {
		await expect(resetPassword("newPassword", "somePasswordToken")).to.be.fulfilled;
		const user = await UserModel.findOne({ "data.email": "validuser@example.com" }).exec();

		const userObj = user.toObject();

		expect(userObj).to.be.an("object");
		expect(userObj.meta).to.be.an("object");
		expect(user.meta.passwordReset).to.be.an("object");
		expect(userObj.meta.passwordReset).to.deep.undefined;
		expect(userObj.data).to.be.an("object");
		expect(await user.validatePassword("newPassword")).to.equal(true);
	});

	it("Should not be able to use a reset token twice ", () => {
		return expect(resetPassword("newPassword", "somePasswordToken")).to.be.rejectedWith(Error);
	});
});
