const supertest = require("supertest");
const startServer = require("../../mocks/startServer");
const companyTestHelper = require("../../helpers/testCompany");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const reportTestHelper = require("../../helpers/testReport");
const loginUser = require("../../helpers/loginUser");
const { NEW_REPORT } = require("../../mocks/report");

describe("Integration", () => {
	describe("Audit logs", () => {
		describe("getAll", () => {
			let server;
			let closeServer;
			let reset;
			let cookie;

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
				await reportTestHelper.create(companyId, { data: NEW_REPORT });

				cookie = (await loginUser(server, { username: "test_company_user@example.com" })).cookie;
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com"]);
				await companyTestHelper.remove();
				await reportTestHelper.remove();
				await closeServer();
			});

			it("Should not get all audit logs when not logged in", () => {
				return supertest(server)
					.get("/api/auditlogs")
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should return all audit logs when no params are provided", () => {
				return supertest(server)
					.get("/api/auditlogs")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});
		});
	});
});
