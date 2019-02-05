
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/recyclingProcess");
const { mockMongoose } = require("../../../../test/mocks");
const RecyclingProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Remove Recycling process", () => {
	let remove;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		remove = require("./remove");

		const result = await new Model(RecyclingProcesses[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should remove the recycling process based on a correct _id", async() => {
		await remove(processId);
		const result = await Model.findOne({ _id: processId }).exec();

		expect(result).to.be.null;
	});
});
