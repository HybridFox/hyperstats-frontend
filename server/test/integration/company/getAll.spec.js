const supertest = require("supertest");
const { expect } = require("chai");
const { dissoc, compose, set, lensPath } = require("ramda");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const companyTestHelper = require("../../helpers/testCompany");
const companyMock = require("../../mocks/company");
const loginUser = require("../../helpers/loginUser");

const complienceOrgMock = compose(
	set(lensPath(["meta", "type"]), "CO"),
	dissoc("_id")
)(companyMock);

describe("Integration", () => {
	describe("Company", () => {
		describe("update", () => {
			let server;
			let closeServer;
			let reset;
			let cookie;
			let recycler1;
			let recycler2;
			let unmanagedRecycler;
			let complienceOrg1;
			let unmanagedComplienceOrg;

			before(async() => {
				const { server: s, closeServer: c, reset: r } = await startServer();

				server = s;
				closeServer = c;
				reset = r;
				recycler1 = (await companyTestHelper.create())._id;
				recycler2 = (await companyTestHelper.create(dissoc("_id", companyMock), recycler1))._id;
				unmanagedRecycler = (await companyTestHelper.create(dissoc("_id", companyMock), "qmsdkljfqsmdf"))._id;
				complienceOrg1 = (await companyTestHelper.create(complienceOrgMock, recycler1))._id;
				unmanagedComplienceOrg = (await companyTestHelper.create(complienceOrgMock, "sdmfkjmqdsfklj"))._id;

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
					companyTestHelper.remove(recycler2),
					companyTestHelper.remove(unmanagedRecycler),
					companyTestHelper.remove(complienceOrg1),
					companyTestHelper.remove(unmanagedComplienceOrg),
				]);
				await closeServer();
			});

			it("Should not get companies when not logged in", () => {
				return supertest(server)
					.get(`/api/companies?type=R`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should get all recycler companies that are coupled to the user", () => {
				return supertest(server)
					.get(`/api/companies?type=R`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array");
						expect(body).to.have.lengthOf(2);
					});
			});

			it("Should get all complience org companies that are coupled to the user", () => {
				return supertest(server)
					.get(`/api/companies?type=CO`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array");
						expect(body).to.have.lengthOf(1);
					});
			});
		});
	});
});
