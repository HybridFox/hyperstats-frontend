const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createObjectId = require("mongoose").Types.ObjectId;
const createReport = require("./create");
const NEW_REPORT = require("../../../test/mocks/report").NEW_REPORT;

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
			const createdReport = await createReport({
				report: NEW_REPORT,
				meta: { status: "FILED" },
				companyId: createObjectId(),
			});

			expect(createdReport).to.be.an("object");
			expect(createdReport.data).to.be.an("object");
			expect(createdReport.data.recyclingEfficiency).to.be.an("object");
			expect(createdReport.data.recyclingEfficiency).to.deep.equal({
				calculatedEfficiency: 1,
			});
			expect(createdReport.meta).to.be.an("object");
			expect(createdReport.meta.status).to.equal("FILED");
		});
	});
});

