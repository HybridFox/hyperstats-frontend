
const { expect, use, should } = require("chai");
const { Types } = require("mongoose");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../../test/mocks");
const Model = require("../../../../models/recyclingProcess");
const RecyclingProcesses = require("../../../../test/mocks/recyclingProcesses");
const errors = require("../../../../helpers/errorHandler");

should();
use(chaiAsPromised);

describe("Activate/deactivate Recyling partner", () => {
	let setActiveProp;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		setActiveProp = require("./setActiveProp");

		const result = await new Model(RecyclingProcesses[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should activate the recycling process based on a correct _id", async() => {
		await setActiveProp(processId, true);

		const result = await Model.findOne({ _id: processId });

		expect(result).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.meta.activated).to.be.true;
	});

	it("Should deactivate the recycling process based on a correct _id", async() => {
		await setActiveProp(processId, false);

		const result = await Model.findOne({ _id: processId });

		expect(result).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.meta.activated).to.be.false;
	});

	it("Should throw error when company doesn't exist", async() => {
		expect(setActiveProp(Types.ObjectId(), true)).to.eventually.rejectedWith(errors.ItemNotFound);
	});
});
