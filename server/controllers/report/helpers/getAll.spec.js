const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../test/mocks");
const createReport = require("./create");
const createTestUser = require("../../../test/helpers/createTestUser");
const createCompany = require("../../company/helpers/create");
const getAllReports = require("./getAll");
const NEW_REPORT = require("../../../test/mocks/report").NEW_REPORT;

should();
use(chaiAsPromised);

describe("Report", () => {
	describe("getAll", () => {
		const firstRecycingProcess = createObjectId();
		const secondRecycingProcess = createObjectId();
		let mongoServer;
		let company;
		let companyOfUser;
		let firstReport;
		let secondReport;

		before(async() => {
			mongoServer = await mockMongoose();

			const user = await createTestUser();

			companyOfUser = user.meta.company;

			company = await createCompany({ companyOfUser, company: {
				data: {
					name: "Some Company",
					vat: "BE12 3456 7890",
					address: {
						street: "Some street",
						number: "33A",
						box: "Some box",
						zipCode: "Zip",
						city: "Antwerp",
						country: "Belgium",
					},
					contactPerson: {
						name: "John Smith",
						function: "Security",
						phone: "+32 ...",
						email: "john.smith@example.com",
					},
				},
				meta: {
					activated: true,
					type: "R",
				},
			} });

			firstReport = await createReport({
				report: {
					...NEW_REPORT,
					information: {
						...NEW_REPORT.information,
						reportingYear: 2019,
						recyclingProcess: firstRecycingProcess,
					},
				},
				companyId: company._id,
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
				companyId: company._id,
			});
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get all reports", async() => {
			const reports = await getAllReports({
				reportedById: company._id,
				companyType: "R",
				recyclingProcessId: null,
				sortBy: "name",
			});

			// fix populated value
			firstReport.data.information.recyclingProcess = null;

			expect(reports).to.be.an("array");
			expect(reports[0].data).to.deep.equal(firstReport.data);
			expect(reports[0].meta.reportingCompany.data.name).to.equal(company.data.name);
			expect(reports.length).to.equal(2);
		});

		it("Should sort reports on reportingYear", async() => {
			const reports = await getAllReports({
				reportedById: company._id,
				companyType: "R",
				recyclingProcessId: null,
				sortBy: "reportingYear",
			});

			// This fixes a problem with a populated value in the getAllReports
			secondReport.data.information.recyclingProcess = null;

			expect(reports).to.be.an("array");
			expect(reports[0].data).to.deep.equal(secondReport.data);
			expect(reports[0].meta.reportingCompany.data.name).to.equal(company.data.name);
			expect(reports.length).to.equal(2);
		});

		it("Should sort reports on reportingYear, descending", async() => {
			const reports = await getAllReports({
				reportedById: company._id,
				companyType: "R",
				recyclingProcessId: null,
				sortBy: "-reportingYear",
			});

			expect(reports).to.be.an("array");
			expect(reports[0].data).to.deep.equal(firstReport.data);
			expect(reports.length).to.equal(2);
		});

		it("Should filter on recyclingProcessId", async() => {
			const reports = await getAllReports({
				reportedById: company._id,
				companyType: "R",
				recyclingProcessId: firstRecycingProcess,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports[0].data).to.deep.equal(firstReport.data);
			expect(reports.length).to.equal(1);
		});

		it("Should filter on recycler", async() => {
			const reports = await getAllReports({
				reportedById: company._id,
				companyType: "AO",
				recycler: company._id,
				recyclingProcessId: firstRecycingProcess,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports.length).to.equal(0);
		});

		it("Should return the approved reports for an AO", async() => {
			const reports = await getAllReports({
				reportedById: company._id,
				companyType: "AO",
				recyclingProcessId: firstRecycingProcess,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports.length).to.equal(0);
		});

		it("Should return the approved reports for an CO", async() => {
			const reports = await getAllReports({
				reportedById: company._id,
				companyType: "CO",
				recyclingProcessId: firstRecycingProcess,
				sortBy: "name",
			});

			expect(reports).to.be.an("array");
			expect(reports.length).to.equal(0);
		});
	});
});

