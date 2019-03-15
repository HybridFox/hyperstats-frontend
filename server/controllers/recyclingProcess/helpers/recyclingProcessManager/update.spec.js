
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../../test/mocks");
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Update Recyling partner", () => {
	let updateCompany;
	let mongoServer;
	let processId;
	let createdProcess;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	before(async() => {
		mongoServer = await mockMongoose();
		updateCompany = require("./update");
		const create = require("./create");

		createdProcess = await create({ process: RecyclingProcesses[0].data, companyId });
		processId = createdProcess._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should update the recycling process based on a correct _id", async() => {
		const result = await updateCompany(processId, {
			...createdProcess,
			data: {
				...createdProcess.data,
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
