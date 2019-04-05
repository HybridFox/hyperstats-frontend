const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createObjectId = require("mongoose").Types.ObjectId;
const createLog = require("./create");

should();
use(chaiAsPromised);

describe("Audit log", () => {
	describe("create", () => {
		let mongoServer;

		before(async() => {
			mongoServer = await mockMongoose();
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should create a log", async() => {
			const createdReport = await createLog({
				item: {
					_id: createObjectId(),
					recyclingProcess: createObjectId(),
					data: { information: { name: "Testreport" } },
				},
				type: "report",
				user: {
					_id: createObjectId(),
					data: {
						firstname: "John",
						lastname: "Connor",
						company: { _id: createObjectId() },
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

