const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../test/mocks");
const createReport = require("./create");
const getAllReports = require("./getAll");
const NEW_REPORT = require("../../../test/mocks/report").NEW_REPORT;

should();
use(chaiAsPromised);

describe("Report", () => {
	describe("getAll", () => {
		const companyId = createObjectId();
		let mongoServer;
		let report;

		before(async() => {
			mongoServer = await mockMongoose();

			report = await createReport({
				report: NEW_REPORT,
				companyId,
			});
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get all reports", async() => {
			const reports = await getAllReports({ reportedById: companyId });

			expect(reports).to.be.an("array");
			expect(reports[0]).to.deep.equal(report);
			expect(reports.length).to.equal(1);
		});
	});
});

