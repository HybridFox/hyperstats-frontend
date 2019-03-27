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
		let mongoServer;

		before(async() => {
			mongoServer = await mockMongoose();

			await createLog({
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

			await createLog({
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
			expect(logs[0].activity).to.deep.equal("John Connor created a report: Testreport");
			expect(logs[1].activity).to.deep.equal("John Connor created a report: Testreport");
			expect(logs.length).to.equal(2);
		});
	});
});

