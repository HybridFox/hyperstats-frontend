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

			it("Should not activate company when not logged in", () => {
				return supertest(server)
					.put(`/api/company/${companyId}/activate`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should not activate a compnay when a malformed id is passed", () => {
				return supertest(server)
					.put("/api/company/malformedId/activate")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should return a not found error when id doesn't exist", () => {
				return supertest(server)
					.put(`/api/company/${Types.ObjectId()}/activate`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should activate a company", () => {
				return supertest(server)
					.put(`/api/company/${companyId}/activate`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});
	});
});
