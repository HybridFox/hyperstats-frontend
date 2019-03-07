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
			let adminCookie;

			const companyToSave = (type = "RP") => ({
				data: {
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
				},
				meta: {
					type: type,
				},
			});

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
				await createTestUser({
					email: "admin_user@example.com",
					isAdmin: true,
				});

				cookie = (await loginUser(server, { username: "test_company_user@example.com" })).cookie;
				adminCookie = (await loginUser(server, { username: "admin_user@example.com" })).cookie;
			});

			afterEach(() => reset());

			after(async() => {
				await removeTestUsers(["test_company_user@example.com", "admin_user@example.com"]);
				await companyTestHelper.remove();
				await closeServer();
			});

			it("Should not create a company when not logged in", () => {
				return supertest(server)
					.post("/api/companies")
					.send({
						data: {
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
						},
						meta: {
							type: "RP",
						},
					})
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should return a validation error when no valid body is passed", () => {
				return supertest(server)
					.post("/api/companies")
					.set("cookie", cookie)
					.send({
						data: {
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
						},
						meta: {
							type: "RP",
						},
					})
					.expect("Content-Type", /json/)
					.expect(400);
			});



			describe("When user is not an admin", () => {
				describe("Should create a Recycling partner", () => {
					let newCompanyId;

					after(() => companyTestHelper.remove(newCompanyId));

					it("create", () => {
						return supertest(server)
							.post("/api/companies")
							.set("cookie", cookie)
							.send(companyToSave())
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
								expect(body.meta.type).to.equal("RP");
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
								expect(body.data).to.deep.equal(companyToSave().data);
							});
					});
				});

				it("Should not create Recycler", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", cookie)
						.send(companyToSave("R"))
						.expect("Content-Type", /json/)
						.expect(400);
				});

				it("Should not create Compliance organisation", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", cookie)
						.send(companyToSave("CO"))
						.expect("Content-Type", /json/)
						.expect(400);
				});

				it("Should not create Authorisation organisation", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", cookie)
						.send(companyToSave("AO"))
						.expect("Content-Type", /json/)
						.expect(400);
				});

				it("Should not create an unexisting company type", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", cookie)
						.send(companyToSave("WAKAWAKA"))
						.expect("Content-Type", /json/)
						.expect(400);
				});
			});

			describe("When user is admin", () => {
				let newCompanyId;

				afterEach(async() => {
					if (newCompanyId) {
						await companyTestHelper.remove(newCompanyId);
						newCompanyId = null;
					}
				});

				it("Should create a recycler", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", adminCookie)
						.send(companyToSave("R"))
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
							expect(body.meta.type).to.equal("R");
							expect(body._id).to.be.an("string");

							newCompanyId = body._id;
						});
				});

				it("Should create a Compliance organisation", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", adminCookie)
						.send(companyToSave("CO"))
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
							expect(body.meta.type).to.equal("CO");
							expect(body._id).to.be.an("string");

							newCompanyId = body._id;
						});
				});

				it("Should create a Authorisation Organisation", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", adminCookie)
						.send(companyToSave("AO"))
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
							expect(body.meta.type).to.equal("AO");
							expect(body._id).to.be.an("string");

							newCompanyId = body._id;
						});
				});

				it("Should not create an unexisting company type", () => {
					return supertest(server)
						.post("/api/companies")
						.set("cookie", adminCookie)
						.send(companyToSave("WAKAWAKA"))
						.expect("Content-Type", /json/)
						.expect(400);
				});
			});
		});
	});
});
