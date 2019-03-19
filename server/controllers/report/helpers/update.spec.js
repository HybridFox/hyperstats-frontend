const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const errors = require("../../../helpers/errorHandler");
const createReport = require("./create");
const { REPORT_STATUS } = require("./const");
const { mockMongoose } = require("../../../test/mocks");
const { NEW_REPORT } = require("../../../test/mocks/report");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");

should();
use(chaiAsPromised);

describe("Report", () => {
	describe("update", () => {
		const companyId = createObjectId();
		let mongoServer;
		let savedReport;
		let filedReport;
		let updateReport;

		before(async() => {
			mockery.enable({ warnOnUnregistered: false });
			mockery.registerMock("nodemailer", nodemailerMock);

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

			updateReport = require("./update");
		});

		afterEach(() => nodemailerMock.mock.reset());

		after(() => {
			mockery.deregisterAll();
			mockery.disable();
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
			})).to.eventually.rejectedWith(errors.ItemNotFound);
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
			})).to.eventually.rejectedWith(errors.ItemNotFound);
		});
	});
});

