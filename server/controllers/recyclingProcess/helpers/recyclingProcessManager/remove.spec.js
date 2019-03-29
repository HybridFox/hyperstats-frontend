
const { expect, use, should } = require("chai");
const { set, lensPath } = require("ramda");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const Model = require("../../../../models/recyclingProcess");
const { mockMongoose } = require("../../../../test/mocks");
const mockProcesses = require("../../../../test/mocks/recyclingProcesses");

const errors = require("../../../../helpers/errorHandler");
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
	let mockReport;
	let companyOfUser;
	const companyId = createObjectId();
	const RecyclingProcesses = mockProcesses();

	beforeEach(async() => {
		mongoServer = await mockMongoose();
		remove = require("./remove");
		const create = require("./create");

		const result = await create({ process: RecyclingProcesses[0].data, companyId });
		processId = result._id;

		const user = await createTestUser();
		companyOfUser = user.data.company;

		this.mockReport = set(
			lensPath(["data", "information", "recyclingProcess"]),
			processId,
			reportMock.mock
		);
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should remove the recycling process based on a correct _id", async() => {
		await createTestReport.create(companyOfUser, set(
			lensPath(["meta", "status"]),
			REPORT_STATUS.SAVED,
			this.mockReport
		));

		await remove(processId);
		const result = await Model.findOne({ _id: processId }).exec();

		expect(result).to.be.an("object").to.have.property("meta").to.be.an("object").to.have.property("deleted").to.be.true;
	});

	it("Should remove the corresponding saved reports", async() => {
		const reportId = (await createTestReport.create(companyOfUser, set(
			lensPath(["meta", "status"]),
			REPORT_STATUS.SAVED,
			this.mockReport
		)))._id;

		await remove(processId);
		const result = await ReportModel.findById(reportId).lean().exec();

		expect(result).to.be.an("object").to.have.property("meta").to.be.an("object").to.have.property("deleted").to.be.true;
	});

	it("Should return 403 when trying to remove a process with a filed report", async() => {
		await createTestReport.create(companyOfUser, mockReport);

		expect(remove(processId)).to.eventually.rejectedWith(errors.Forbidden);
	});

	it("Should return 404 when trying to remove a removed process", async() => {
		await remove(processId);

		expect(remove(processId)).to.eventually.rejectedWith(errors.ProcessNotFound);
	});
});

