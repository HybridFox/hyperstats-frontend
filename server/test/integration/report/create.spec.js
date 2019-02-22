const supertest = require("supertest");
const { expect } = require("chai");
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
		describe("create", () => {
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

				cookie = (await loginUser(server, { email: "test_company_user@example.com" })).cookie;
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com"]);
				await companyTestHelper.remove();
				await reportTestHelper.remove();
				await closeServer();
			});

			it("Should not create a report when not logged in", () => {
				return supertest(server)
					.post("/api/reports")
					.send({ data: NEW_REPORT })
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should return a validation error when no valid body is passed", () => {
				return supertest(server)
					.post("/api/reports")
					.set("cookie", cookie)
					.send(NEW_REPORT)
					.expect("Content-Type", /json/)
					.expect(400);
			});

			describe("Should create a report", () => {
				let newReportId;

				after(() => reportTestHelper.remove(newReportId));

				it("should return the created report and set the status to 'SAVED' by default", () => {
					return supertest(server)
						.post("/api/reports")
						.set("cookie", cookie)
						.send({ data: NEW_REPORT })
						.expect("Content-Type", /json/)
						.expect(201)
						.then(({ body }) => {
							expect(body).to.be.an("object");
							expect(body.data).to.be.an("object");
							expect(body.data).to.have.ownProperty("information");
							expect(body.meta).to.be.an("object");
							expect(body.meta).to.have.ownProperty("created");
							expect(body.meta).to.have.ownProperty("lastUpdated");
							expect(body.meta).to.have.ownProperty("status");
							expect(body.meta.status).to.equal(REPORT_STATUS.SAVED);
							expect(body._id).to.be.an("string");

							newReportId = body._id;
						});
				});

				it("should return the created report and set the status to 'FILED' if requestd", () => {
					return supertest(server)
						.post("/api/reports")
						.set("cookie", cookie)
						.send({ data: NEW_REPORT, meta: { status: REPORT_STATUS.FILED } })
						.expect("Content-Type", /json/)
						.expect(201)
						.then(({ body }) => {
							expect(body).to.be.an("object");
							expect(body.data).to.be.an("object");
							expect(body.data).to.have.ownProperty("information");
							expect(body.meta).to.be.an("object");
							expect(body.meta).to.have.ownProperty("created");
							expect(body.meta).to.have.ownProperty("lastUpdated");
							expect(body.meta).to.have.ownProperty("status");
							expect(body.meta.status).to.equal(REPORT_STATUS.FILED);
							expect(body._id).to.be.an("string");

							newReportId = body._id;
						});
				});
			});
		});
	});
});
