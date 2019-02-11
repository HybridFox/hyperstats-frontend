const supertest = require("supertest");
const { Types } = require("mongoose");
const startServer = require("../../mocks/startServer");
const removeTestUsers = require("../../helpers/removeTestUsers");
const companyTestHelper = require("../../helpers/testCompany");
const loginUser = require("../../helpers/loginUser");

describe("Integration", () => {
	describe("Company", () => {
		describe("update", () => {
			let server;
			let closeServer;
			let reset;
			let cookie;
			let companyId;

			before(async() => {
				const { server: s, closeServer: c, reset: r } = await startServer();

				server = s;
				closeServer = c;
				reset = r;
				companyId = (await companyTestHelper.create())._id;
				cookie = (await loginUser(server, { email: "test_company_user@example.com" })).cookie;
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com"]);
				await companyTestHelper.remove();
				await closeServer();
			});

			it("Should not deactivate company when not logged in", () => {
				return supertest(server)
					.patch(`/api/companies/${companyId}/deactivate`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should not deactivate a compnay when a malformed id is passed", () => {
				return supertest(server)
					.patch("/api/companies/malformedId/deactivate")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should return a not found error when id doesn't exist", () => {
				return supertest(server)
					.patch(`/api/companies/${Types.ObjectId()}/deactivate`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should deactivate a company", () => {
				return supertest(server)
					.patch(`/api/companies/${companyId}/deactivate`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});
	});
});
