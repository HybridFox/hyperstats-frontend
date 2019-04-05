const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createObjectId = require("mongoose").Types.ObjectId;
const createLog = require("./create");

const createTestUser = require("../../../test/helpers/createTestUser");
const mockProcesses = require("../../../test/mocks/recyclingProcesses");
const createProcess = require("../../recyclingProcess/helpers/recyclingProcessManager/create");



should();
use(chaiAsPromised);

describe.only("Audit log", () => {
	describe("create", () => {
		let mongoServer;
		let recyclingProcess;
		let user;
		const RecyclingProcesses = mockProcesses();

		before(async() => {
			mongoServer = await mockMongoose();

			user = await createTestUser();
			recyclingProcess = await createProcess({
				process: RecyclingProcesses[0].data,
				meta: RecyclingProcesses[0].meta,
				companyId: user.data.company,
			});
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should create a log for a report", async() => {
			const createdReport = await createLog({
				item: {
					_id: createObjectId(),
					recyclingProcess: recyclingProcess._id,
					data: { information: { name: "Testreport" } },
				},
				type: "report",
				user: {
					_id: createObjectId(),
					data: {
						firstname: "John",
						lastname: "Connor",
						company: user.data.company,
					},
				},
			});

			expect(createdReport).to.be.an("object");
			expect(createdReport.data).to.be.an("object");
			expect(createdReport.data.logs).to.be.an("array");
			expect(createdReport.data.logs.length).to.equal(1);
		});

		it("Should create a log for a proxy", async() => {
			const createdReport = await createLog({
				item: {
					_id: createObjectId(),
					recyclingProcess: recyclingProcess._id,
					proxy: user.data.company,
					data: { year: "2019" },
				},
				type: "proxy",
				user: {
					_id: createObjectId(),
					data: {
						firstname: "John",
						lastname: "Connor",
						company: user.data.company,
					},
				},
			});

			expect(createdReport).to.be.an("object");
			expect(createdReport.data).to.be.an("object");
			expect(createdReport.data.logs).to.be.an("array");
			expect(createdReport.data.logs.length).to.equal(1);
		});
	});
});

