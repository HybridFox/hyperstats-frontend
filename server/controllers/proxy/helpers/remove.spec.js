const { expect, use, should } = require("chai");
const { set, lensPath, omit } = require("ramda");
const chaiAsPromised = require("chai-as-promised");
const createProxy = require("./create");
const removeProxy = require("./remove");
const ReportModel = require("../../../models/report");
const Errors = require("../../../helpers/errorHandler");
const { mockMongoose, company: companyMock, report: reportMock } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const createTestCompany = require("../../../test/helpers/testCompany");
const createTestProcess = require("../../../test/helpers/testRecyclingProcess");
const createTestReport = require("../../../test/helpers/testReport");

should();
use(chaiAsPromised);

describe("Proxy", () => {
	describe("remove", () => {
		const companyMockWithouthId = omit(["_id"], companyMock);
		let mongoServer;
		let companyOfUser;
		let company1;
		let company2;
		let recyclingProcessId;
		let reportId;

		before(async() => {
			mongoServer = await mockMongoose();

			const user = await createTestUser();

			company1 = await createTestCompany.create(set(
				lensPath(["meta", "type"]),
				"CO",
				companyMockWithouthId
			));
			company2 = await createTestCompany.create(set(
				lensPath(["meta", "type"]),
				"AO",
				companyMockWithouthId
			));
			companyOfUser = user.data.company;
			recyclingProcessId = (await createTestProcess.create(companyOfUser))._id;
			reportId = (await createTestReport.create(companyOfUser, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId,
				reportMock.mock
			)))._id;
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should return an 'item not found' error when the report can't be found", () => {
			expect(createProxy({
				proxy: company1._id,
				recyclingProcess: recyclingProcessId,
				year: 0,
				userCompany: companyOfUser,
			})).to.eventually.throw(Errors.ItemNotFound);
		});

		describe("Add an then remove a company from a report", () => {
			it("Should add 2 approved company to a report of the same year & recycling process", async() => {
				await createProxy({
					proxy: company1._id,
					recyclingProcess: recyclingProcessId,
					year: reportMock.mock.data.information.reportingYear,
					userCompany: companyOfUser,
				});
				await createProxy({
					proxy: company2._id,
					recyclingProcess: recyclingProcessId,
					year: reportMock.mock.data.information.reportingYear,
					userCompany: companyOfUser,
				});

				const result = await ReportModel.findById(reportId).lean().exec();

				expect(result).to.be.an("object");
				expect(result.meta).to.be.an("object");
				expect(result.meta.approvedCompanies).to.be.an("array").and.to.have.lengthOf(2);
				expect(JSON.parse(
					JSON.stringify(
						omit(["_id"], result.meta.approvedCompanies[0])
					)
				)).to.deep.equal({
					company: company1._id.toString(),
					approvedBy: companyOfUser.toString(),
					linkedApprovals: [],
				});
			});

			it("Should remove the recently added approved company to a report of the same year & recycling process", async() => {
				await removeProxy({
					proxy: company1._id,
					recyclingProcess: recyclingProcessId,
					year: reportMock.mock.data.information.reportingYear,
					userCompany: companyOfUser,
				});

				const result = await ReportModel.findById(reportId).lean().exec();

				expect(result).to.be.an("object");
				expect(result.meta).to.be.an("object");
				expect(result.meta.approvedCompanies).to.be.an("array").and.to.have.lengthOf(1);
				expect(JSON.parse(
					JSON.stringify(
						omit(["_id"], result.meta.approvedCompanies[0])
					)
				)).to.deep.equal({
					company: company2._id.toString(),
					approvedBy: companyOfUser.toString(),
					linkedApprovals: [],
				});
			});
		});
	});
});



