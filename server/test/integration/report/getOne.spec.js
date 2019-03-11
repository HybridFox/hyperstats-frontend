const supertest = require("supertest");
const startServer = require("../../mocks/startServer");
const companyTestHelper = require("../../helpers/testCompany");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const reportTestHelper = require("../../helpers/testReport");
const loginUser = require("../../helpers/loginUser");
const { NEW_REPORT } = require("../../mocks/report");

describe("Integration", () => {
	describe("Report", () => {
		describe("update", () => {
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

				cookie = (await loginUser(server, { username: "test_company_user@example.com" })).cookie;
				report = await reportTestHelper.create(companyId, { data: NEW_REPORT });
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com"]);
				await companyTestHelper.remove();
				await reportTestHelper.remove();
				await closeServer();
			});

			it("Should not update update the report when not logged in", () => {
				return supertest(server)
					.get(`/api/reports/${report._id}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should not update update the report when the data is invalid", () => {
				return supertest(server)
					.get(`/api/reports/${report._id}`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});

			// it("Should return no report when the id is not found", () => {
			// 	return supertest(server)
			// 		.get(`/api/reports/${createObjectId()}`)
			// 		.set("cookie", cookie)
			// 		.expect("Content-Type", /json/)
			// 		.expect(404);
			// });
		});
	});
});
