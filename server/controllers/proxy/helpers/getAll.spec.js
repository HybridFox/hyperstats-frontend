const { expect, use, should } = require("chai");
const { set, lensPath, omit } = require("ramda");
const chaiAsPromised = require("chai-as-promised");
const createProxy = require("./create");
const getAllProxies = require("./getAll");
const Errors = require("../../../helpers/errorHandler");
const { mockMongoose, company: companyMock, report: reportMock } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const createTestCompany = require("../../../test/helpers/testCompany");
const createTestProcess = require("../../../test/helpers/testRecyclingProcess");
const createTestReport = require("../../../test/helpers/testReport");

should();
use(chaiAsPromised);

describe("Proxy", () => {
	describe("getAll", () => {
		const companyMockWithouthId = omit(["_id"], companyMock);
		const reportMockWithoutId = omit(["_id"], reportMock.mock);

		let mongoServer;
		let companyOfUser;
		let company1;
		let company2;
		let company3;
		let otherRecyclerId;
		let recyclingProcessId1;
		let recyclingProcessId2;
		let recyclingProcessId3;
		let report1;
		let report2;
		let report3;
		let report4;

		before(async() => {
			mongoServer = await mockMongoose();

			const user = await createTestUser();

			/**
			 * Company 1 => R1, RP1
			 * Company 2 => R2, R3, RP2
			 * Company 3 => R1, R4, RP1, RP3
			 */

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
			company3 = await createTestCompany.create(set(
				lensPath(["meta", "type"]),
				"AO",
				companyMockWithouthId
			));
			otherRecyclerId = (await createTestCompany.create(companyMockWithouthId))._id;

			companyOfUser = user.data.company;

			recyclingProcessId1 = (await createTestProcess.create(companyOfUser))._id;
			recyclingProcessId2 = (await createTestProcess.create(companyOfUser))._id;
			recyclingProcessId3 = (await createTestProcess.create(companyOfUser))._id;

			report1 = await createTestReport.create(companyOfUser, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId1,
				reportMockWithoutId
			));
			report2 = await createTestReport.create(companyOfUser, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId2,
				reportMockWithoutId
			));
			report3 = await createTestReport.create(company2._id.toString(), set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId2,
				reportMockWithoutId
			));
			report4 = await createTestReport.create(company3._id, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId3,
				reportMockWithoutId
			));
		});

		after(() => {
			mongoServer.stop();
		});

		it("should do something", async() => {
			// Company of user

			await createProxy({
				proxy: company1._id,
				recyclingProcess: recyclingProcessId1,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: companyOfUser,
			});

			await createProxy({
				proxy: company2._id,
				recyclingProcess: recyclingProcessId2,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: companyOfUser,
			});

			await createProxy({
				proxy: company3._id,
				recyclingProcess: recyclingProcessId1,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: companyOfUser,
			});

			await createProxy({
				proxy: company3._id,
				recyclingProcess: recyclingProcessId3,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: companyOfUser,
			});

			// Other recycler

			await createProxy({
				proxy: company2._id,
				recyclingProcess: recyclingProcessId3,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: otherRecyclerId,
			});

			await createProxy({
				proxy: company2._id,
				recyclingProcess: recyclingProcessId1,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: otherRecyclerId,
			});

			await createProxy({
				proxy: company1._id,
				recyclingProcess: recyclingProcessId2,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: otherRecyclerId,
			});

			const [company1Result, company2Result, company3Result ] = await getAllProxies(companyOfUser);

			expect(company1Result).to.be.an("object");
			expect(company1Result.proxyCompanyId.toString()).to.equal(company1._id.toString());
			expect(company1Result.processes).to.be.an("array").and.to.have.lengthOf(1);
			expect(company1Result.processes[0].process._id.toString()).to.equal(recyclingProcessId1.toString());
			expect(company1Result.processes[0].reports).to.have.lengthOf(1);
			expect(company1Result.processes[0].reports[0]._id.toString()).to.equal(report1._id.toString());

			expect(company2Result).to.be.an("object");
			expect(company2Result.proxyCompanyId.toString()).to.equal(company2._id.toString());
			expect(company2Result.processes).to.be.an("array").and.to.have.lengthOf(1);
			expect(company2Result.processes[0].process._id.toString()).to.equal(recyclingProcessId2.toString());
			expect(company2Result.processes[0].reports).to.have.lengthOf(2);
			expect(company2Result.processes[0].reports[0]._id.toString()).to.equal(report2._id.toString());
			expect(company2Result.processes[0].reports[1]._id.toString()).to.equal(report3._id.toString());

			expect(company3Result).to.be.an("object");
			expect(company3Result.proxyCompanyId.toString()).to.equal(company3._id.toString());
			expect(company3Result.processes).to.be.an("array").and.to.have.lengthOf(2);
			expect(company3Result.processes[0].process._id.toString()).to.equal(recyclingProcessId3.toString());
			expect(company3Result.processes[0].reports).to.have.lengthOf(1);
			expect(company3Result.processes[0].reports[0]._id.toString()).to.equal(report4._id.toString());
			expect(company3Result.processes[1].process._id.toString()).to.equal(recyclingProcessId1.toString());
			expect(company3Result.processes[1].reports).to.have.lengthOf(1);
			expect(company3Result.processes[1].reports[0]._id.toString()).to.equal(report1._id.toString());
		});
	});
});



