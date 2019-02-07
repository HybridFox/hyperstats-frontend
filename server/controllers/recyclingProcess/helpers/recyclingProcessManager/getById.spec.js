
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/recyclingProcess");
const { mockMongoose } = require("../../../../test/mocks");
const RecyclingProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Get Recycling process", () => {
	let getById;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		getById = require("./getById");

		const result = await new Model(RecyclingProcesses[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get the recycling process based on a correct _id", async() => {
		const result = await getById(processId);

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.name).to.equal(RecyclingProcesses[0].data.name);
		expect(result.data.steps).to.be.an("array").to.have.lengthOf(1);
	});
});