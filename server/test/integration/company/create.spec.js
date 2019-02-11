const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const companyTestHelper = require("../../helpers/testCompany");
const loginUser = require("../../helpers/loginUser");

describe("Integration", () => {
	describe("Company", () => {
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
				await closeServer();
			});

			it("Should not create a company when not logged in", () => {
				return supertest(server)
					.post("/api/companies?type=R")
					.send({
						name: "Some Company",
						vat: "BE12 3456 7890",
						address: {
							street: "Some street",
							number: "33A",
							box: "Some box",
							zipCode: "Zip",
							city: "Antwerp",
							country: "Belgium",
						},
						contactPerson: {
							name: "John Smith",
							function: "Security",
							phone: "+32 ...",
							email: "john.smith@example.com",
						},
					})
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should return a validation error when no valid body is passed", () => {
				return supertest(server)
					.post("/api/companies?type=R")
					.set("cookie", cookie)
					.send({
						address: {
							street: "Some street",
							number: "33A",
							box: "Some box",
							zipCode: "Zip",
							city: "Antwerp",
							country: "Belgium",
						},
						contactPerson: {
							name: "John Smith",
							function: "Security",
							phone: "+32 ...",
							email: "john.smith@example.com",
						},
					})
					.expect("Content-Type", /json/)
					.expect(400);
			});

			describe("Should create a company", () => {
				let newCompanyId;

				after(() => companyTestHelper.remove(newCompanyId));

				it("should return the created company", () => {
					return supertest(server)
						.post("/api/companies?type=R")
						.set("cookie", cookie)
						.send({
							name: "Some company name",
							vat: "BE12 3456 7890",
							address: {
								street: "Some street",
								number: "33A",
								box: "Some box",
								zipCode: "Zip",
								city: "Antwerp",
								country: "Belgium",
							},
							contactPerson: {
								name: "John Smith",
								function: "Security",
								phone: "+32 ...",
								email: "john.smith@example.com",
							},
						})
						.expect("Content-Type", /json/)
						.expect(201)
						.then(({ body }) => {
							expect(body).to.be.an("object");
							expect(body.data).to.be.an("object");
							expect(body.data).to.deep.equal({
								name: "Some company name",
								vat: "BE12 3456 7890",
								address: {
									street: "Some street",
									number: "33A",
									box: "Some box",
									zipCode: "Zip",
									city: "Antwerp",
									country: "Belgium",
								},
								contactPerson: {
									name: "John Smith",
									function: "Security",
									phone: "+32 ...",
									email: "john.smith@example.com",
								},
							});
							expect(body.meta).to.be.an("object");
							expect(body.meta).to.have.ownProperty("created");
							expect(body.meta).to.have.ownProperty("lastUpdated");
							expect(body.meta).to.have.ownProperty("type");
							expect(body._id).to.be.an("string");

							newCompanyId = body._id;
						});
				});

				it("should have stored the created company", () => {
					supertest(server)
						.get(`/api/companies/${newCompanyId}`)
						.set("cookie", cookie)
						.expect(200)
						.then(({ body }) => {
							expect(body).to.be.an("object");
							expect(body.data).to.be.an("object");
							expect(body.data).to.deep.equal({
								name: "Some company name",
								vat: "BE12 3456 7890",
								address: {
									street: "Some street",
									number: "33A",
									box: "Some box",
									zipCode: "Zip",
									city: "Antwerp",
									country: "Belgium",
								},
								contactPerson: {
									name: "John Smith",
									function: "Security",
									phone: "+32 ...",
									email: "john.smith@example.com",
								},
							});
						});
				});
			});
		});
	});
});
