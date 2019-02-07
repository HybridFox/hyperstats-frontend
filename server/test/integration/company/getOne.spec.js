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
			let unmanagedRecycler;
			let complienceOrg1;
			let unmanagedComplienceOrg;

			before(async() => {
				const { server: s, closeServer: c, reset: r } = await startServer();

				server = s;
				closeServer = c;
				reset = r;
				recycler1 = (await companyTestHelper.create())._id;
				unmanagedRecycler = (await companyTestHelper.create(dissoc("_id", companyMock), "qmsdkljfqsmdf"))._id;
				complienceOrg1 = (await companyTestHelper.create(complienceOrgMock, recycler1))._id;
				unmanagedComplienceOrg = (await companyTestHelper.create(complienceOrgMock, "sdmfkjmqdsfklj"))._id;

				await createTestUser({
					email: "test_company_user@example.com",
					company: recycler1,
				});

				cookie = (await loginUser(server, { email: "test_company_user@example.com" })).cookie;
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com"]);
				await Promise.all([
					companyTestHelper.remove(),
					companyTestHelper.remove(recycler1),
					companyTestHelper.remove(unmanagedRecycler),
					companyTestHelper.remove(complienceOrg1),
					companyTestHelper.remove(unmanagedComplienceOrg),
				]);
				await closeServer();
			});

			it("Should not get a company when not logged in", () => {
				return supertest(server)
					.get(`/api/company/${recycler1}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should get a recycler company that is coupled to the user", () => {
				return supertest(server)
					.get(`/api/company/${recycler1}`)
					.expect("Content-Type", /json/)
					.set("cookie", cookie)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body.data).to.be.an("object");
						expect(body.data.name).to.equal("Some company");
					});
			});

			it("Should not get a recycler company that is not coupled to the user", () => {
				return supertest(server)
					.get(`/api/company/${unmanagedRecycler}`)
					.expect("Content-Type", /json/)
					.set("cookie", cookie)
					.expect(500);
			});

			it("Should get a compliance org company that is coupled to the user", () => {
				return supertest(server)
					.get(`/api/company/${complienceOrg1}`)
					.expect("Content-Type", /json/)
					.set("cookie", cookie)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body.data).to.be.an("object");
						expect(body.data.name).to.equal("Some company");
					});
			});

			it("Should not get a compliance org company that is not coupled to the user", () => {
				return supertest(server)
					.get(`/api/company/${unmanagedComplienceOrg}`)
					.expect("Content-Type", /json/)
					.set("cookie", cookie)
					.expect(500);
			});
		});
	});
});