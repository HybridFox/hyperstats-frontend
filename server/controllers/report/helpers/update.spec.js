const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../test/mocks");
const createReport = require("./create");
const updateReport = require("./update");
const NEW_REPORT = require("../../../test/mocks/report").NEW_REPORT;

should();
use(chaiAsPromised);

describe.only("Report", () => {
	describe("update", () => {
		const companyId = createObjectId();
		let mongoServer;
		let initialReport;

		before(async() => {
			mongoServer = await mockMongoose();

			initialReport = await createReport({
				report: NEW_REPORT,
				meta: { status: "SAVED" },
				companyId,
			});
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should update one report", async() => {
			const updatedData = {
				...NEW_REPORT,
				information: {
					...NEW_REPORT,
					reportingYear: 2018,
				},
			};

			const updatedReport = await updateReport({
				_id: initialReport._id.toString(),
				reportedById: companyId,
				updatedData,
				updatedStatus: "FILED",
			});

			expect(updatedReport).to.be.an("object");
			expect(updatedReport.data.information.reportingYear).to.equal(2018);
			expect(updatedReport.meta.status).to.equal("FILED");
			expect(updatedReport.meta.lastUpdated).to.not.equal(initialReport.meta.lastUpdated);
			expect(updatedReport.meta.created).to.not.equal(initialReport.meta.created);
		});
	});
});

