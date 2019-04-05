const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const createObjectId = require("mongoose").Types.ObjectId;
const { mockMongoose } = require("../../../test/mocks");
const createLog = require("./create");
const updateLog = require("./update");

should();
use(chaiAsPromised);

describe("Audit log", () => {
	describe("update", () => {
		const companyId = createObjectId();
		const reportId = createObjectId();
		let mongoServer;

		before(async() => {
			mongoServer = await mockMongoose();

			await createLog({
				report: {
					_id: reportId,
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

		it("Should update a log for a specific report", async() => {
			const log = await updateLog({
				report: {
					_id: reportId,
					data: { information: { name: "Testreport" } },
				},
				user: {
					_id: createObjectId(),
					data: {
						firstname: "Sarah",
						lastname: "Connor",
						company: { _id: companyId },
					},
				},
				isFiled: false,
			});

			expect(log).to.be.an("object");
			expect(log.data.logs[1].activity).to.equal("Sarah Connor saved a report: Testreport");
		});

		it("Should update create a seperate log for when a specific report is filed", async() => {
			const log = await updateLog({
				report: {
					_id: reportId,
					data: { information: { name: "Testreport" } },
				},
				user: {
					_id: createObjectId(),
					data: {
						firstname: "Sarah",
						lastname: "Connor",
						company: { _id: companyId },
					},
				},
				isFiled: true,
			});

			expect(log).to.be.an("object");
			expect(log.data.logs[2].activity).to.equal("Sarah Connor filed a report: Testreport");
		});

		it("Should throw an error when there is no report to update", async() => {
			updateLog({
				report: {
					_id: createObjectId(),
					data: { information: { name: "Testreport" } },
				},
				user: {
					_id: createObjectId(),
					data: {
						firstname: "Sarah",
						lastname: "Connor",
						company: { _id: companyId },
					},
				},
				isFiled: false,
			}).should.eventually.throw();
		});
	});
});

