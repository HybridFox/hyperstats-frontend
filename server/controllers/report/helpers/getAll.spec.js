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
		const firstRecycingProcess = createObjectId();
		const secondRecycingProcess = createObjectId();
		let mongoServer;
		let firstReport;
		let secondReport;

		before(async() => {
			mongoServer = await mockMongoose();

			firstReport = await createReport({
				report: {
					...NEW_REPORT,
					information: {
						...NEW_REPORT.information,
						reportingYear: 2019,
						recyclingProcess: firstRecycingProcess,
					},
				},
				companyId,
			});

			secondReport = await createReport({
				report: {
					...NEW_REPORT,
					information: {
						...NEW_REPORT.information,
						reportingYear: 2018,
						recyclingProcess: secondRecycingProcess,
					},
				},
				companyId,
			});
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get all reports", async() => {
			const reports = await getAllReports({
				reportedById: companyId,
				companyType: "R",
				recyclingProcessId: null,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports[0]).to.deep.equal(firstReport);
			expect(reports.length).to.equal(2);
		});

		it("Should sort reports on reportingYear", async() => {
			const reports = await getAllReports({
				reportedById: companyId,
				companyType: "R",
				recyclingProcessId: null,
				sortBy: "reportingYear",
			});

			expect(reports).to.be.an("array");
			expect(reports[0]).to.deep.equal(secondReport);
			expect(reports.length).to.equal(2);
		});

		it("Should sort reports on reportingYear, descending", async() => {
			const reports = await getAllReports({
				reportedById: companyId,
				companyType: "R",
				recyclingProcessId: null,
				sortBy: "-reportingYear",
			});

			expect(reports).to.be.an("array");
			expect(reports[0]).to.deep.equal(firstReport);
			expect(reports.length).to.equal(2);
		});

		it("Should filter on recyclingProcessId", async() => {
			const reports = await getAllReports({
				reportedById: companyId,
				companyType: "R",
				recyclingProcessId: firstRecycingProcess,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports[0]).to.deep.equal(firstReport);
			expect(reports.length).to.equal(1);
		});

		it("Should return the approved reports for an AO", async() => {
			const reports = await getAllReports({
				reportedById: companyId,
				companyType: "AO",
				recyclingProcessId: firstRecycingProcess,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports.length).to.equal(0);
		});

		it("Should return the approved reports for an CO", async() => {
			const reports = await getAllReports({
				reportedById: companyId,
				companyType: "CO",
				recyclingProcessId: firstRecycingProcess,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports.length).to.equal(0);
		});
	});
});

