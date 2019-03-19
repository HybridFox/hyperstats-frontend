
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const Model = require("../../../../models/recyclingProcess");
const { mockMongoose } = require("../../../../test/mocks");
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Remove Recycling process", () => {
	let remove;
	let mongoServer;
	let processId;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	before(async() => {
		mongoServer = await mockMongoose();
		remove = require("./remove");
		const create = require("./create");

		const result = await create({ process: RecyclingProcesses[0].data, companyId });

		processId = result._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should remove the recycling process based on a correct _id", async() => {
		await remove(processId);
		const result = await Model.findOne({ _id: processId }).exec();

		expect(result).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.meta.deleted).to.be.true;
	});
});
