const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../test/mocks");
const createLog = require("./create");
const getAllLogs = require("./getAll");

should();
use(chaiAsPromised);

describe("Audit log", () => {
	describe("getAll", () => {
		const companyId = createObjectId();
		let logsForFirstReport = createObjectId();
		let logsForSecondReport = createObjectId();
		let mongoServer;

		before(async() => {
			mongoServer = await mockMongoose();

			logsForFirstReport = await createLog({
				report: {
					_id: createObjectId(),
					data: { information: { name: "Testreport" } },
				},
				user: {
					_id: createObjectId(),
					data: {
						firstname: "John",
						lastname: "Connor",
						company: { _id: companyId },
					},
				},
			});

			logsForSecondReport = await createLog({
				report: {
					_id: createObjectId(),
					data: { information: { name: "Testreport" } },
				},
				user: {
					_id: createObjectId(),
					data: {
						firstname: "John",
						lastname: "Connor",
						company: { _id: companyId },
					},
				},
			});
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get all logs", async() => {
			const logs = await getAllLogs(companyId);

			expect(logs).to.be.an("array");
			expect(logs[0]).to.deep.equal(logsForFirstReport);
			expect(logs[1]).to.deep.equal(logsForSecondReport);
			expect(logs.length).to.equal(2);
		});
	});
});

