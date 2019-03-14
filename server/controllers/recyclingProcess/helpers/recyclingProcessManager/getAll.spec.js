
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../../test/mocks");
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");

should();
use(chaiAsPromised);

describe("Get Recycling processes", () => {
	let getAll;
	let mongoServer;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	before(async() => {
		mongoServer = await mockMongoose();
		getAll = require("./getAll");
		const create = require("./create");

		await create({ process: RecyclingProcesses[0].data, companyId });
		await create({ process: RecyclingProcesses[1].data, companyId });
		await create({ process: RecyclingProcesses[2].data, companyId });
		await create({ process: RecyclingProcesses[3].data, companyId });
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get all recycling processes", async() => {
		const result = await getAll({ companyId });

		expect(result).to.be.an("array").to.have.lengthOf(4);
		expect(result[0].data).to.be.an("object");
		expect(result[0].meta).to.be.an("object");
		expect(result[0].data.name).to.equal(RecyclingProcesses[0].data.name);
		expect(result[0].meta.createdByCompany.toString()).to.equal(companyId.toString());
		expect(result[0].data.steps).to.be.an("array").to.have.lengthOf(1);
	});
});
