const { expect, use, should } = require("chai");
const { set, lensPath, omit } = require("ramda");
const chaiAsPromised = require("chai-as-promised");
const createProxy = require("./create");
const getAllProxies = require("./getAll");
const { mockMongoose, company: companyMock, report: reportMock } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const createTestCompany = require("../../../test/helpers/testCompany");
const createTestProcess = require("../../../test/helpers/testRecyclingProcess");
const createTestReport = require("../../../test/helpers/testReport");

should();
use(chaiAsPromised);

describe("Proxy", () => {
	describe("getAll", () => {
		/**
		 * Company 1 => R1, RP1
		 * Company 2 => R2, R3, RP2
		 * Company 3 => R1, R4, RP1, RP3
		 */

		const companyMockWithouthId = omit(["_id"], companyMock);
		const reportMockWithoutId = omit(["_id"], reportMock.mock);

		let mongoServer;
		let companyOfUser;
		let otherRecyclerId;

		let company1;
		let company2;
		let company3;

		let recyclingProcessId1;
		let recyclingProcessId2;
		let recyclingProcessId3;

		let report1;
		let report2;
		let report3;
		let report4;
		let report5;
		let report6;
		let report7;

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
			report3 = await createTestReport.create(companyOfUser.toString(), set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId2,
				reportMockWithoutId
			));
			report4 = await createTestReport.create(companyOfUser, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId3,
				reportMockWithoutId
			));
			report5 = await createTestReport.create(otherRecyclerId.toString(), set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId2,
				reportMockWithoutId
			));
			report6 = await createTestReport.create(otherRecyclerId, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId3,
				reportMockWithoutId
			));
			report7 = await createTestReport.create(otherRecyclerId, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId3,
				reportMockWithoutId
			));
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get the reports ordered by company and process", async() => {
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

			const results = await getAllProxies(companyOfUser);

			const company1Result = results.find((r) => r.proxyCompanyId.toString() === company1._id.toString());
			const company2Result = results.find((r) => r.proxyCompanyId.toString() === company2._id.toString());
			const company3Result = results.find((r) => r.proxyCompanyId.toString() === company3._id.toString());

			expect(company1Result).to.be.an("object");
			expect(company1Result.proxyCompanyId.toString()).to.equal(company1._id.toString());
			expect(company1Result.processes).to.be.an("array");
			expect(company1Result.processes).to.have.lengthOf(1);
			expect(company1Result.processes[0].process._id.toString()).to.equal(recyclingProcessId1.toString());
			expect(company1Result.processes[0].reports).to.have.lengthOf(1);
			expect(company1Result.processes[0].reports[0]._id.toString()).to.equal(report1._id.toString());

			expect(company2Result).to.be.an("object");
			expect(company2Result.proxyCompanyId.toString()).to.equal(company2._id.toString());
			expect(company2Result.processes).to.be.an("array");
			expect(company2Result.processes).to.have.lengthOf(1);
			expect(company2Result.processes[0].process._id.toString()).to.equal(recyclingProcessId2.toString());
			expect(company2Result.processes[0].reports).to.have.lengthOf(2);
			expect(company2Result.processes[0].reports.find((report) => report._id.toString() === report2._id.toString())).to.be.an("object");
			expect(company2Result.processes[0].reports.find((report) => report._id.toString() === report3._id.toString())).to.be.an("object");


			expect(company3Result).to.be.an("object");
			expect(company3Result.proxyCompanyId.toString()).to.equal(company3._id.toString());
			expect(company3Result.processes).to.be.an("array");
			expect(company3Result.processes).to.have.lengthOf(2);

			const process1 = company3Result.processes.find((p) => p.process._id.toString() === recyclingProcessId1.toString());
			const process2 = company3Result.processes.find((p) => p.process._id.toString() === recyclingProcessId3.toString());

			expect(process1).to.be.an("object");
			expect(process1.reports).to.be.an("array");
			expect(process1.reports).to.have.lengthOf(1);
			expect(process1.reports[0]._id.toString()).to.equal(report1._id.toString());
			expect(process2).to.be.an("object");
			expect(process2.reports).to.be.an("array");
			expect(process2.reports).to.have.lengthOf(1);
			expect(process2.reports[0]._id.toString()).to.equal(report4._id.toString());
		});
	});
});



