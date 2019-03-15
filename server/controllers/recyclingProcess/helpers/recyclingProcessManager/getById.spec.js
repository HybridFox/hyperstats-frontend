
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../../test/mocks");
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Get Recycling process", () => {
	let getById;
	let mongoServer;
	let processId;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	before(async() => {
		mongoServer = await mockMongoose();
		getById = require("./getById");
		const create = require("./create");

		const result = await create({ process: RecyclingProcesses[0].data, companyId });

		processId = result._id;
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
