
const { expect, use, should } = require("chai");
const { Types } = require("mongoose");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../../test/mocks");
const Model = require("../../../../models/recyclingProcess");
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");
const errors = require("../../../../helpers/errorHandler");

should();
use(chaiAsPromised);

describe("Activate/deactivate Recyling partner", () => {
	let setActiveProp;
	let mongoServer;
	let processId;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	before(async() => {
		mongoServer = await mockMongoose();
		setActiveProp = require("./setActiveProp");
		const create = require("./create");

		const result = await create({ process: RecyclingProcesses[0].data, companyId });

		processId = result._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should activate the recycling process based on a correct _id", async() => {
		const result = await setActiveProp(processId, true);
		const dbResult = await Model.findOne({ _id: processId });

		expect(result).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.meta.activated).to.be.true;
		expect(dbResult).to.be.an("object");
		expect(dbResult.meta).to.be.an("object");
		expect(dbResult.meta.activated).to.be.true;
	});

	it("Should deactivate the recycling process based on a correct _id", async() => {
		const result = await setActiveProp(processId, false);
		const dbResult = await Model.findOne({ _id: processId });

		expect(result).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.meta.activated).to.be.false;
		expect(dbResult).to.be.an("object");
		expect(dbResult.meta).to.be.an("object");
		expect(dbResult.meta.activated).to.be.false;
	});

	it("Should throw error when company doesn't exist", async() => {
		expect(setActiveProp(Types.ObjectId(), true)).to.eventually.rejectedWith(errors.ItemNotFound);
	});
});
