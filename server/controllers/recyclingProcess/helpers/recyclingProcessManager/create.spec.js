
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../../test/mocks");
const createObjectId = require("mongoose").Types.ObjectId;
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Create Recycling process", () => {
	let create;
	let mongoServer;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	before(async() => {
		mongoServer = await mockMongoose();
		create = require("./create");
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should create a recycling process", async() => {
		const result = await create({
			process: RecyclingProcesses[0].data,
			meta: RecyclingProcesses[0].meta,
			companyId,
		});

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.name).to.equal(RecyclingProcesses[0].data.name);
		expect(result.data.steps).to.be.an("array").to.have.lengthOf(1);
	});
});
