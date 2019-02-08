const supertest = require("supertest");
const { expect } = require("chai");
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
			let companyId;
			let otherCompanyId;

			before(async() => {
				const { server: s, closeServer: c, reset: r } = await startServer();

				server = s;
				closeServer = c;
				reset = r;
				companyId = (await companyTestHelper.create())._id;
				otherCompanyId = (await companyTestHelper.create(dissoc("_id", companyMock)))._id;

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
				await companyTestHelper.remove(otherCompanyId);
				await closeServer();
			});

			it("Should not update a company when not logged in", () => {
				return supertest(server)
					.put(`/api/company/${companyId}`)
					.send({
						name: "Some Company updated",
						vat: "BE12 3456 7890",
						address: {
							street: "Some street updated",
							number: "33A",
							box: "Some box",
							zipCode: "Zip",
							city: "Antwerp updated",
							country: "Belgium",
						},
						contactPerson: {
							name: "John Smith",
							function: "Security",
							phone: "+32 ... updated",
							email: "john.smith@example.com",
						},
					})
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should not update a company that is not managed by the user", () => {
				return supertest(server)
					.put(`/api/company/${otherCompanyId}`)
					.set("cookie", cookie)
					.send({
						name: "Some Company updated",
						vat: "BE12 3456 7890",
						address: {
							street: "Some street updated",
							number: "33A",
							box: "Some box",
							zipCode: "Zip",
							city: "Antwerp updated",
							country: "Belgium",
						},
						contactPerson: {
							name: "John Smith",
							function: "Security",
							phone: "+32 ... updated",
							email: "john.smith@example.com",
						},
					})
					.expect("Content-Type", /json/)
					.expect(500);
			});

			it("Should return a validation error when no valid body is passed", () => {
				return supertest(server)
					.put(`/api/company/${companyId}`)
					.set("cookie", cookie)
					.send({
						address: {
							street: "Some street updated",
							number: "33A",
							box: "Some box",
							zipCode: "Zip",
							city: "Antwerp updated",
							country: "Belgium",
						},
						contactPerson: {
							name: "John Smith",
							function: "Security",
							phone: "+32 ... updated",
							email: "john.smith@example.com",
						},
					})
					.expect("Content-Type", /json/)
					.expect(400);
			});

			describe("Should update a company", () => {
				it("should return the created company", () => {
					return supertest(server)
						.put(`/api/company/${companyId}`)
						.set("cookie", cookie)
						.send({
							name: "Some Company updated",
							vat: "BE12 3456 7890",
							address: {
								street: "Some street updated",
								number: "33A",
								box: "Some box",
								zipCode: "Zip",
								city: "Antwerp updated",
								country: "Belgium",
							},
							contactPerson: {
								name: "John Smith",
								function: "Security",
								phone: "+32 ... updated",
								email: "john.smith@example.com",
							},
						})
						.expect("Content-Type", /json/)
						.expect(200)
						.then(({ body }) => {
							expect(body).to.be.an("object");
							expect(body.data).to.be.an("object");
							expect(body.data).to.deep.equal({
								name: "Some Company updated",
								vat: "BE12 3456 7890",
								address: {
									street: "Some street updated",
									number: "33A",
									box: "Some box",
									zipCode: "Zip",
									city: "Antwerp updated",
									country: "Belgium",
								},
								contactPerson: {
									name: "John Smith",
									function: "Security",
									phone: "+32 ... updated",
									email: "john.smith@example.com",
								},
							});
							expect(body.meta).to.be.an("object");
							expect(body.meta).to.have.ownProperty("created");
							expect(body.meta).to.have.ownProperty("lastUpdated");
							expect(body.meta).to.have.ownProperty("type");
							expect(body._id).to.be.an("string");
						});
				});

				it("should have stored the created company", () => {
					supertest(server)
						.put(`/api/company/${companyId}`)
						.set("cookie", cookie)
						.expect(200)
						.then(({ body }) => {
							expect(body).to.be.an("object");
							expect(body.data).to.be.an("object");
							expect(body.data).to.deep.equal({
								name: "Some Company updated",
								vat: "BE12 3456 7890",
								address: {
									street: "Some street updated",
									number: "33A",
									box: "Some box",
									zipCode: "Zip",
									city: "Antwerp updated",
									country: "Belgium",
								},
								contactPerson: {
									name: "John Smith",
									function: "Security",
									phone: "+32 ... updated",
									email: "john.smith@example.com",
								},
							});
						});
				});
			});
		});
	});
});
