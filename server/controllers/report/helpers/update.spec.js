const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const ResponseError = require("../../../helpers/errors/responseError");
const createReport = require("./create");
const updateReport = require("./update");
const { REPORT_STATUS } = require("./const");
const { mockMongoose } = require("../../../test/mocks");
const { NEW_REPORT } = require("../../../test/mocks/report");

should();
use(chaiAsPromised);

describe("Report", () => {
	describe("update", () => {
		const companyId = createObjectId();
		let mongoServer;
		let savedReport;
		let filedReport;

		before(async() => {
			mongoServer = await mockMongoose();

			savedReport = await createReport({
				report: NEW_REPORT,
				meta: { status: REPORT_STATUS.SAVED },
				companyId,
			});
			filedReport = await createReport({
				report: NEW_REPORT,
				meta: { status: REPORT_STATUS.SAVED },
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
				_id: savedReport._id.toString(),
				reportedById: companyId,
				updatedData,
				updatedStatus: REPORT_STATUS.FILED,
			});

			expect(updatedReport).to.be.an("object");
			expect(updatedReport.data.information.reportingYear).to.equal(2018);
			expect(updatedReport.meta.status).to.equal(REPORT_STATUS.FILED);
			expect(updatedReport.meta.lastUpdated).to.not.equal(savedReport.meta.lastUpdated);
			expect(updatedReport.meta.created).to.not.equal(savedReport.meta.created);
		});

		it("Should not be able to update a report that's filed", async() => {
			const updatedData = {
				...NEW_REPORT,
				information: {
					...NEW_REPORT,
					reportingYear: 2018,
				},
			};

			expect(updateReport({
				_id: filedReport._id.toString(),
				reportedById: companyId,
				updatedData,
			})).to.eventually.rejectedWith(ResponseError);
		});

		it("Should throw an error when no report is found", () => {
			const updatedData = {
				...NEW_REPORT,
				information: {
					...NEW_REPORT,
					reportingYear: 2018,
				},
			};

			expect(updateReport({
				_id: createObjectId(),
				reportedById: companyId,
				updatedData,
			})).to.eventually.rejectedWith(ResponseError);
		});
	});
});

