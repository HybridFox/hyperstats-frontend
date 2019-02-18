const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../test/mocks");
const createReport = require("./create");
const getOneReport = require("./getOne");
const NEW_REPORT = require("../../../test/mocks/report").NEW_REPORT;

should();
use(chaiAsPromised);

describe("Report", () => {
	describe("getOne", () => {
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

		it("Should get one report", async() => {
			const fetchedReport = await getOneReport({ _id: report._id, reportedById: companyId });

			expect(fetchedReport).to.be.an("object");
			expect(fetchedReport._id.toString()).to.equal(report._id.toString());
		});
	});
});

