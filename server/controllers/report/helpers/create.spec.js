const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createReport = require("./create");
const NEW_REPORT = require("./const").NEW_REPORT;

should();
use(chaiAsPromised);

describe("Report", () => {
	describe("create", () => {
		let mongoServer;

		before(async() => {
			mongoServer = await mockMongoose();
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should create a report", async() => {
			const createdReport = await createReport(NEW_REPORT);

			expect(createdReport).to.be.an("object");
			expect(createdReport.data).to.be.an("object");
			expect(createdReport.data.recyclingEfficiency).to.be.an("object");
			expect(createdReport.data.recyclingEfficiency).to.deep.equal({
				calculatedEfficiency: 1,
			});
		});
	});
});

