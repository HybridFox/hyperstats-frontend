const supertest = require("supertest");
const { Types } = require("mongoose");
const { dissoc, compose, set, lensPath } = require("ramda");
const startServer = require("../../mocks/startServer");
const removeTestUsers = require("../../helpers/removeTestUsers");
const companyTestHelper = require("../../helpers/testCompany");
const loginUser = require("../../helpers/loginUser");
const companyMock = require("../../mocks/company");
const createTestUser = require("../../helpers/createTestUser");

describe("Integration", () => {
	describe("Company", () => {
		describe("activate", () => {
			let server;
			let closeServer;
			let reset;
			let cookie;
			let adminCookie;
			let companyId;
			let otherCompanyId;
			let linkedRecyclerId;
			let complianceOrgId;
			let authorisationOrgId;

			const getCompanyMock = (type) => compose(
				set(lensPath(["meta", "type"]), type),
				dissoc("_id")
			)(companyMock);

			before(async() => {
				const { server: s, closeServer: c, reset: r } = await startServer();

				server = s;
				closeServer = c;
				reset = r;
				companyId = (await companyTestHelper.create())._id;
				otherCompanyId = (await companyTestHelper.create(dissoc("_id", companyMock)))._id;
				complianceOrgId = (await companyTestHelper.create(getCompanyMock("CO")))._id;
				authorisationOrgId = (await companyTestHelper.create(getCompanyMock("AO")))._id;

				await createTestUser({
					email: "test_company_user@example.com",
					company: companyId,
				});
				await createTestUser({
					email: "admin_user@example.com",
					isAdmin: true,
				});

				const userResponse = await loginUser(server, { email: "test_company_user@example.com" });

				adminCookie = (await loginUser(server, { email: "admin_user@example.com" })).cookie;
				linkedRecyclerId = (await companyTestHelper.create(dissoc("_id", companyMock), userResponse.body.company._id))._id;
				cookie = userResponse.cookie;
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com", "admin_user@example.com"]);
				await Promise.all([
					companyTestHelper.remove(),
					companyTestHelper.remove(otherCompanyId),
					companyTestHelper.remove(complianceOrgId),
					companyTestHelper.remove(authorisationOrgId),
					companyTestHelper.remove(linkedRecyclerId),
				]);
				await closeServer();
			});

			it("Should not activate company when not logged in", () => {
				return supertest(server)
					.patch(`/api/companies/${companyId}/activate`)
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should not activate a company when a malformed id is passed", () => {
				return supertest(server)
					.patch("/api/companies/malformedId/activate")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(404);
			});

			it("Should return a not found error when id doesn't exist", () => {
				return supertest(server)
					.patch(`/api/companies/${Types.ObjectId()}/activate`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(404);
			});

			describe("When user is not an admin", () => {
				it("Should return an error when user is not linked to the company", () => {
					return supertest(server)
						.patch(`/api/companies/${otherCompanyId}/activate`)
						.set("cookie", cookie)
						.expect("Content-Type", /json/)
						.expect(404);
				});

				it("Should return an error when the user is not an admin and the company is a compliance organisation", () => {
					return supertest(server)
						.patch(`/api/companies/${complianceOrgId}/activate`)
						.set("cookie", cookie)
						.expect("Content-Type", /json/)
						.expect(404);
				});

				it("Should return an error when the user is not an admin and the company is a authorisation organisation", () => {
					return supertest(server)
						.patch(`/api/companies/${authorisationOrgId}/activate`)
						.set("cookie", cookie)
						.expect("Content-Type", /json/)
						.expect(404);
				});

				it("Should activate a company", () => {
					return supertest(server)
						.patch(`/api/companies/${companyId}/activate`)
						.set("cookie", cookie)
						.expect("Content-Type", /json/)
						.expect(200);
				});
			});

			describe("when user is admin", () => {
				it("Should activate a recycling partner", () => {
					return supertest(server)
						.patch(`/api/companies/${otherCompanyId}/activate`)
						.set("cookie", adminCookie)
						.expect("Content-Type", /json/)
						.expect(200);
				});

				it("Should activate a recycler", () => {
					return supertest(server)
						.patch(`/api/companies/${linkedRecyclerId}/activate`)
						.set("cookie", adminCookie)
						.expect("Content-Type", /json/)
						.expect(200);
				});

				it("Should activate a compliance organisation", () => {
					return supertest(server)
						.patch(`/api/companies/${complianceOrgId}/activate`)
						.set("cookie", adminCookie)
						.expect("Content-Type", /json/)
						.expect(200);
				});

				it("Should activate a authorisation organisation", () => {
					return supertest(server)
						.patch(`/api/companies/${authorisationOrgId}/activate`)
						.set("cookie", adminCookie)
						.expect("Content-Type", /json/)
						.expect(200);
				});
			});
		});
	});
});
