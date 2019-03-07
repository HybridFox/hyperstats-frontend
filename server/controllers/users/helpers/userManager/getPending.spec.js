
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/user");
const { mockMongoose } = require("../../../../test/mocks");
const pendingUsers = require("../../../../test/mocks/pendingUsers");

should();
use(chaiAsPromised);

describe("Get Users", () => {
	let getPending;
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();
		getPending = require("./getPending");

		await new Model(pendingUsers[0]).save();
		await new Model(pendingUsers[1]).save();
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get all pending users", async() => {
		const result = await getPending();

		expect(result).to.be.an("array").to.have.lengthOf(2);
		expect(result[0]).to.be.an("object");
		expect(result[0].data).to.be.an("object");
		expect(result[0].meta).to.be.an("object");
		expect(result[0].data.firstname).to.equal(pendingUsers[0].data.firstname);
		expect(result[0].data.lastname).to.equal(pendingUsers[0].data.lastname);
		expect(result[0].data.email).to.equal(pendingUsers[0].data.email);
		expect(result[0].meta.status.type).to.equal("PENDING");
	});
});
