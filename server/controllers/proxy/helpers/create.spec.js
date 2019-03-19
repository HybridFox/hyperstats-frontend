const { expect, use, should } = require("chai");
const { set, lensPath, omit } = require("ramda");
const chaiAsPromised = require("chai-as-promised");
const createProxy = require("./create");
const ReportModel = require("../../../models/report");
const Errors = require("../../../helpers/errorHandler");
const { mockMongoose, company: companyMock, report: reportMock } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const createTestCompany = require("../../../test/helpers/testCompany");
const createObjectId = require("mongoose").Types.ObjectId;
const createTestReport = require("../../../test/helpers/testReport");

should();
use(chaiAsPromised);

describe("Proxy", () => {
	describe("create", () => {
		let mongoServer;
		let companyOfUser;
		let company;
		let recyclingProcessId;
		let reportId;

		before(async() => {
			mongoServer = await mockMongoose();

			const user = await createTestUser();

			company = await createTestCompany.create(set(
				lensPath(["meta", "type"]),
				"CO",
				companyMock
			));
			companyOfUser = user.data.company;
			recyclingProcessId = createObjectId();
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
				proxy: company._id,
				recyclingProcess: recyclingProcessId,
				year: 0,
				userCompany: companyOfUser,
			})).to.eventually.throw(Errors.ItemNotFound);
		});

		it("Should add an approved company to a report of the same year & recycling process", async() => {
			await createProxy({
				proxy: company._id,
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
				company: company._id.toString(),
				approvedBy: companyOfUser.toString(),
				linkedApprovals: [],
			});
		});
	});
});



