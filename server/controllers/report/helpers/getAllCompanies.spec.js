const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../test/mocks");
const createReport = require("./create");
const createTestUser = require("../../../test/helpers/createTestUser");
const createCompany = require("../../company/helpers/create");
const getAllCompanies = require("./getAllCompanies");
const NEW_REPORT = require("../../../test/mocks/report").NEW_REPORT;

should();
use(chaiAsPromised);

describe("Report", () => {
	describe("getAllCompanies", () => {
		const firstRecycingProcess = createObjectId();
		const secondRecycingProcess = createObjectId();
		let mongoServer;
		let company;
		let companyOfUser;
		let user;

		before(async() => {
			mongoServer = await mockMongoose();

			user = await createTestUser();

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

			await createReport({
				report: {
					...NEW_REPORT,
					information: {
						...NEW_REPORT.information,
						reportingYear: 2019,
						recyclingProcess: firstRecycingProcess,
					},
				},
				meta: {
					approvedCompanies: [
						company._id,
					],
					status: "FILED",
				},
				companyId: company._id,
			});

			await createReport({
				report: {
					...NEW_REPORT,
					information: {
						...NEW_REPORT.information,
						reportingYear: 2018,
						recyclingProcess: secondRecycingProcess,
					},
				},
				meta: {
					approvedCompanies: [
						user._id,
					],
					status: "FILED",
				},
				companyId: company._id,
			});

			await createReport({
				report: {
					...NEW_REPORT,
					information: {
						...NEW_REPORT.information,
						reportingYear: 2018,
						recyclingProcess: secondRecycingProcess,
					},
				},
				meta: {
					approvedCompanies: [
						user._id,
					],
					status: "SAVED",
				},
				companyId: company._id,
			});
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get all companies when AO", async() => {
			const reports = await getAllCompanies({
				reportedById: user._id,
				companyType: "AO",
			});

			expect(reports).to.be.an("array");
			expect(reports[0]._id).to.deep.equal(company._id);
			expect(reports.length).to.equal(1);
		});

		it("Should get all companies when CO", async() => {
			const reports = await getAllCompanies({
				reportedById: user._id,
				companyType: "CO",
			});

			expect(reports).to.be.an("array");
			expect(reports[0]._id).to.deep.equal(company._id);
			expect(reports.length).to.equal(1);
		});

		it("Should get no result when the id has no result", async() => {
			const reports = await getAllCompanies({
				reportedById: createObjectId(),
				companyType: "CO",
			});

			expect(reports).to.be.an("array");
			expect(reports.length).to.equal(0);
		});
	});
});

