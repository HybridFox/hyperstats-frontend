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
		describe("getAll", () => {
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

			it("Should not get all reports when not logged in", () => {
				return supertest(server)
					.get("/api/reports")
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should return all reports when no params are provided", () => {
				return supertest(server)
					.get("/api/reports")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});

			it("Should return all reports for a specific recycling-process", () => {
				return supertest(server)
					.get(`/api/reports?recycling-process=${report.data.information.recyclingProcess}`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});

			it("Should return all reports for sorted by name ascending", () => {
				return supertest(server)
					.get(`/api/reports?sort=name`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});

			it("Should return all reports for sorted by name descending", () => {
				return supertest(server)
					.get(`/api/reports?sort=-name`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});

			it("Should return all reports for sorted by reportingYear ascending", () => {
				return supertest(server)
					.get(`/api/reports?sort=reportingYear`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});

			it("Should return all reports for sorted by reportingYear descending", () => {
				return supertest(server)
					.get(`/api/reports?sort=-reportingYear`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200);
			});
		});
	});
});
