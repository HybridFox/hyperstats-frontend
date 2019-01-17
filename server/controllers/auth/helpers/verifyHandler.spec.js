const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const removeTestUsers = require("../../../test/helpers/removeTestUsers");
const createTestUser = require("../../../test/helpers/createTestUser");

should();
use(chaiAsPromised);

const verifyHandler = require("./verifyHandler");

describe("Verify handler", () => {
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();
		await createTestUser({
			isValidated: false,
		});
	});

	after(async() => {
		mongoServer.stop();

		await removeTestUsers(["validuser@example.com"]);
	});

	it("Should fail to verify the user if the token is wrong", () => {
		return expect(verifyHandler("invalidToken")).to.be.rejectedWith(Error);
	});

	it("Should validate the user if the token is ok", () => {
		return expect(verifyHandler("someToken")).to.be.fulfilled;
	});

	it("Should fail to verify the user if the user is already validated", () => {
		return expect(verifyHandler("someToken")).to.be.rejectedWith(Error);
	});
});
