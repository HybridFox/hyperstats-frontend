const supertest = require("supertest");
const createObjectId = require("mongoose").Types.ObjectId;
const startServer = require("../../mocks/startServer");
const companyTestHelper = require("../../helpers/testCompany");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const reportTestHelper = require("../../helpers/testReport");
const loginUser = require("../../helpers/loginUser");
const { NEW_REPORT } = require("../../mocks/report");
const { REPORT_STATUS } = require("../../../controllers/report/helpers/const");

describe("Integration", () => {
	describe("Report", () => {
		describe("getOne", () => {
			let server;
			let closeServer;
			let reset;
			let cookie;
			let report;

			before(async() => {
				const { server: s, closeServer: c, reset: r } = await startServer();

				server = s;
				closeServer = c;
				reset = r;

				const { _id: companyId } = await companyTestHelper.create();
				await createTestUser({
					email: "test_company_user@example.com",
					company: companyId,
				});

				cookie = (await loginUser(server, { email: "test_company_user@example.com" })).cookie;
				report = await reportTestHelper.create(companyId, { data: NEW_REPORT });
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com"]);
				await companyTestHelper.remove();
				await reportTestHelper.remove();
				await closeServer();
			});

			it("Should not update the report when not logged in", () => {
				return supertest(server)
					.put(`/api/reports/${report._id}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should not update the report when invalid data is provided", () => {
				return supertest(server)
					.put(`/api/reports/${report._id}`)
					.set("cookie", cookie)
					.send("invalid data")
					.expect("Content-Type", /json/)
					.expect(400);
			});

			it("Should not update the report when it is not found", () => {
				return supertest(server)
					.put(`/api/reports/${createObjectId()}}`)
					.set("cookie", cookie)
					.send({ data: NEW_REPORT })
					.expect("Content-Type", /json/)
					.expect(404);
			});

			it("Should update the report when data is valid", () => {
				return supertest(server)
					.put(`/api/reports/${report._id}`)
					.set("cookie", cookie)
					.send({ data: NEW_REPORT })
					.expect("Content-Type", /json/)
					.expect(200);
			});

			it("Should be able to file the report when data is valid", () => {
				return supertest(server)
					.put(`/api/reports/${report._id}`)
					.set("cookie", cookie)
					.send({ data: NEW_REPORT, meta: { status: REPORT_STATUS.FILED } })
					.expect("Content-Type", /json/)
					.expect(200);
			});

			it("Should not be able to update the report when the report is filed", () => {
				return supertest(server)
					.put(`/api/reports/${report._id}`)
					.set("cookie", cookie)
					.send({ data: NEW_REPORT, meta: { status: REPORT_STATUS.SAVED } })
					.expect("Content-Type", /json/)
					.expect(422);
			});
		});
	});
});
