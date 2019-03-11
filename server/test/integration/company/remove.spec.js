const supertest = require("supertest");
require("chai");
const { dissoc } = require("ramda");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const companyTestHelper = require("../../helpers/testCompany");
const companyMock = require("../../mocks/company");
const loginUser = require("../../helpers/loginUser");

describe("Integration", () => {
	describe("Company", () => {
		describe("update", () => {
			let server;
			let closeServer;
			let reset;
			let cookie;
			let recycler1;
			let unmanagedRecycler;

			before(async() => {
				const { server: s, closeServer: c, reset: r } = await startServer();

				server = s;
				closeServer = c;
				reset = r;
				recycler1 = (await companyTestHelper.create())._id;
				unmanagedRecycler = (await companyTestHelper.create(dissoc("_id", companyMock), "qmsdkljfqsmdf"))._id;

				await createTestUser({
					email: "test_company_user@example.com",
					company: recycler1,
				});

				cookie = (await loginUser(server, { username: "test_company_user@example.com" })).cookie;
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com"]);
				await Promise.all([
					companyTestHelper.remove(),
					companyTestHelper.remove(recycler1),
					companyTestHelper.remove(unmanagedRecycler),
				]);
				await closeServer();
			});

			it("Should not remove a company when not logged in", () => {
				return supertest(server)
					.delete(`/api/companies/${recycler1}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should remove a company", () => {
				return supertest(server)
					.delete(`/api/companies/${recycler1}`)
					.set("cookie", cookie)
					.expect(204);
			});

			it("Should not remove a company when the user has no rights to it", () => {
				return supertest(server)
					.delete(`/api/companies/${unmanagedRecycler}`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(500);
			});
		});
	});
});
