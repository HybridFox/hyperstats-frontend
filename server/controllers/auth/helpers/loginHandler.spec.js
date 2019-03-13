
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const errors = require("../../../helpers/errorHandler");
const loginHandler = require("./loginHandler");

should();
use(chaiAsPromised);

describe("LoginHandler", () => {
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();

		await createTestUser();
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should error when not finding the user", () => {
		return expect(loginHandler("example@example.com", "invalid")).to.eventually.rejectedWith(errors.UserNotFound);
	});

	it("Should find a user", () => {
		return expect(loginHandler("validuser@example.com", "validPassword")).to.eventually.be.fulfilled;
	});
});
