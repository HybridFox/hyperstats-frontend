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
		let recyclingProcessId1;
		let recyclingProcessId2;
		let recyclingProcessId3;

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

			companyOfUser = user.data.company;

			recyclingProcessId1 = (await createTestProcess.create(companyOfUser))._id;
			recyclingProcessId2 = (await createTestProcess.create(companyOfUser))._id;
			recyclingProcessId3 = (await createTestProcess.create(companyOfUser))._id;

			await createTestReport.create(companyOfUser, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId1,
				reportMockWithoutId
			));
			await createTestReport.create(companyOfUser, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId2,
				reportMockWithoutId
			));

			await createTestReport.create(company2._id.toString(), set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId3,
				reportMockWithoutId
			));
			await createTestReport.create(company3._id, set(
				lensPath(["data", "information", "recyclingProcess"]),
				recyclingProcessId1,
				reportMockWithoutId
			));
		});

		after(() => {
			mongoServer.stop();
		});

		it("should do something", async() => {
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
				proxy: company1._id,
				recyclingProcess: recyclingProcessId2,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: companyOfUser,
			});

			await createProxy({
				proxy: company2._id,
				recyclingProcess: recyclingProcessId3,
				year: reportMock.mock.data.information.reportingYear,
				userCompany: companyOfUser,
			});

			console.log(JSON.stringify(await getAllProxies(companyOfUser), null, 4));
		});
	});
});



