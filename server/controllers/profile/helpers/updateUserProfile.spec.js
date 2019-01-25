
const { expect } = require("chai");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const UserModel = require("../../../models/user");

const updateUserProfile = require("./updateUserProfile");

describe("Update user profile", () => {
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();

		await createTestUser();
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should error when user is not found", () => {
		return expect(updateUserProfile("example@example.com", "invalid")).to.eventually.rejectedWith(Error);
	});

	it("Should update the user", async() => {
		await expect(updateUserProfile("validuser@example.com", {
			firstname: "firstnameUpdated",
			lastname: "lastnameUpdated",
		})).to.eventually.be.fulfilled;

		const user = await UserModel.findOne({ "data.email": "validuser@example.com" }).exec();

		expect(user).to.be.an("object");
		expect(user.data).be.an("object");
		expect(user.data.firstname).to.equal("firstnameUpdated");
		expect(user.data.lastname).to.equal("lastnameUpdated");
	});
});
