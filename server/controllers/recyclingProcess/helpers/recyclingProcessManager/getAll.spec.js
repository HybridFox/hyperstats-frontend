
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/recyclingProcess");
const { mockMongoose } = require("../../../../test/mocks");
const RecyclingProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Get Recycling processes", () => {
	let getAll;
	let mongoServer;

	before(async() => {
		mongoServer = await mockMongoose();
		getAll = require("./getAll");

		await new Model(RecyclingProcesses[0]).save();
		await new Model(RecyclingProcesses[1]).save();
		await new Model(RecyclingProcesses[2]).save();
		await new Model(RecyclingProcesses[3]).save();
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get all recycling processes", async() => {
		const result = await getAll();

		expect(result).to.be.an("array").to.have.lengthOf(4);
		expect(result[0].data).to.be.an("object");
		expect(result[0].meta).to.be.an("object");
		expect(result[0].data.name).to.equal(RecyclingProcesses[0].data.name);
		expect(result[0].data.steps).to.be.an("array").to.have.lengthOf(1);
	});
});
