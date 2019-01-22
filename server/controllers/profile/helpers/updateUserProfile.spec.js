
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const UserModel = require("../../../models/user");

should();
use(chaiAsPromised);

const updateUserProfile = require("./updateUserProfile");

describe("LoginHandler", () => {
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
