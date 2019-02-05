
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/user");
const { mockMongoose } = require("../../../../test/mocks");
const Users = require("../../../../test/mocks/users");

should();
use(chaiAsPromised);

describe("Get Users", () => {
	let getAll;
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();
		getAll = require("./getAll");

		await new Model(Users[0]).save();
		await new Model(Users[1]).save();
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get all users", async() => {
		const result = await getAll();

		expect(result).to.be.an("array").to.have.lengthOf(2);
		expect(result[0]).to.be.an("object");
		expect(result[0].data).to.be.an("object");
		expect(result[0].meta).to.be.an("object");
		expect(result[0].data.firstname).to.equal(Users[0].data.firstname);
		expect(result[0].data.lastname).to.equal(Users[0].data.lastname);
		expect(result[0].data.email).to.equal(Users[0].data.email);
	});
});
