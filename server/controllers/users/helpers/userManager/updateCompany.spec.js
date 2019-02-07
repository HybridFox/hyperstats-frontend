
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/user");
const { mockMongoose } = require("../../../../test/mocks");
const Users = require("../../../../test/mocks/users");

should();
use(chaiAsPromised);

describe("Update User Company", () => {
	let updateCompany;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		updateCompany = require("./updateCompany");

		const result = await new Model(Users[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should update the user company by id", async() => {
		const result = await updateCompany(processId, "507f1f77bcf86cd799439011");

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.firstname).to.equal(Users[0].data.firstname);
		expect(result.data.email).to.equal(Users[0].data.email);
		expect(result.data.company.toString()).to.equal("507f1f77bcf86cd799439011");
	});
});
