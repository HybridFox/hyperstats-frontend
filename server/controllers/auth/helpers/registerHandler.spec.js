const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose, createTestUser } = require("../../../test/mocks");

should();
use(chaiAsPromised);

const registerHandler = require("./registerHandler");
const loginHandler = require("./loginHandler");

describe("LoginHandler", () => {
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();

		await createTestUser();
	});

	it("Should error email is already registered", () => expect(registerHandler({
		email: "validuser@example.com",
		password: "validPassword",
		firstname: "firstname",
		lastname: "lastname",
	})).to.eventually.rejectedWith(Error));

	it("Register a new user", () => expect(registerHandler({
		email: "validuser2@example.com",
		password: "validPassword",
		firstname: "firstname",
		lastname: "lastname",
	})).to.eventually.be.fulfilled);



	it("Should be able to login user after registration", async() => {
		const userToTest = {
			email: "validuser3@example.com",
			password: "validPassword3",
			firstname: "firstname3",
			lastname: "lastname3",
		};
		await registerHandler(userToTest);

		return expect(loginHandler(userToTest.email, userToTest.password)).to.eventually.be.fulfilled;
	});

	after((done) => {
		mongoServer.stop();
		done();
	});
});
