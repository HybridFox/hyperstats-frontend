
const { expect, use, should } = require("chai");
const { set, lensPath } = require("ramda");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const Model = require("../../../../models/recyclingProcess");
const { mockMongoose } = require("../../../../test/mocks");
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");

const { report: reportMock } = require("../../../../test/mocks");
const createTestUser = require("../../../../test/helpers/createTestUser");
const createTestReport = require("../../../../test/helpers/testReport");
const ReportModel = require("../../../../models/report");
const { REPORT_STATUS } = require("../../../report/helpers/const");

should();
use(chaiAsPromised);

describe("Remove Recycling process", () => {
	let remove;
	let mongoServer;
	let processId;
	let reportId;
	let companyOfUser;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	before(async() => {
		mongoServer = await mockMongoose();
		remove = require("./remove");
		const create = require("./create");

		const result = await create({ process: RecyclingProcesses[0].data, companyId });
		processId = result._id;

		const user = await createTestUser();
		companyOfUser = user.data.company;

		let mockReport = set(
			lensPath(["data", "information", "recyclingProcess"]),
			processId,
			reportMock.mock
		);

		mockReport = set(
			lensPath(["meta", "status"]),
			REPORT_STATUS.SAVED,
			mockReport
		);

		reportId = (await createTestReport.create(companyOfUser, mockReport))._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should remove the recycling process based on a correct _id", async() => {
		await remove(processId);
		const result = await Model.findOne({ _id: processId }).exec();

		expect(result).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.meta.deleted).to.be.true;
	});

	it("Should remove the corresponding saved reports", async() => {
		const result = await ReportModel.findById(reportId).lean().exec();
		expect(result).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.meta.deleted).to.be.true;
	});
});
