
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../../test/mocks");
const Model = require("../../../../models/recyclingProcess");
const RecyclingProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Update Recyling partner", () => {
	let updateCompany;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		updateCompany = require("./update");

		const result = await new Model(RecyclingProcesses[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should update the recycling process based on a correct _id", async() => {
		const result = await updateCompany(processId, {
			...RecyclingProcesses[0],
			data: {
				...RecyclingProcesses[0].data,
				name: "updated name",
			},
		});

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.name).to.equal("updated name");
		expect(result.data.steps).to.be.an("array").to.have.lengthOf(1);
	});
});
