
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/user");
const { mockMongoose } = require("../../../../test/mocks");
const Users = require("../../../../test/mocks/users");

should();
use(chaiAsPromised);

describe("Get User", () => {
	let getById;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		getById = require("./getById");

		const result = await new Model(Users[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get the user based on a correct _id", async() => {
		const result = await getById(processId);

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.firstname).to.equal(Users[0].data.firstname);
		expect(result.data.lastname).to.equal(Users[0].data.lastname);
		expect(result.data.email).to.equal(Users[0].data.email);
	});
});
