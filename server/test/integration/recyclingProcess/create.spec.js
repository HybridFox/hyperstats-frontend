const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const mockRecyclingProcesses = require("../../mocks/recyclingProcesses");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const loginUser = require("../../helpers/loginUser");
const clearData = require("../../helpers/clearData");
const insertData = require("../../helpers/insertData");

describe("Integration", () => {
	describe("Recycling Process", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;

		before(async() => {
			await createTestUser({
				email: "test1@example.com",
				isAdmin: true,
			});
			await createTestUser({
				email: "test2@example.com",
				isAdmin: true,
			});

			await clearData("recyclingProcess");
			await insertData("recyclingProcess", mockRecyclingProcesses);

			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			cookie = (await loginUser(server)).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com", "test2@example.com"]);
			await closeServer();
		});

		describe("When not logged in", () => {
			it("Should not create recycling process by id", () => {
				return supertest(server)
					.get(`/api/recycling-processes`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should return validation error", async() => {
				return supertest(server)
					.post(`/api/recycling-processes`)
					.set("cookie", cookie)
					.send(({
						"data": {
							"steps": [
								{
									"qualitativeDescription": {
										"text": "qualitativeDescription text 100",
										"asset": " qualitativeDescription asset 1",
									},
									"_id": "5c49bbebe9fe3f0a757f0001",
									"precedingStep": "precedingStep 1",
									"description": "description 1",
									"site": "site 120",
									"methodOfProcessing": "methodOfProcessing 1",
									"schematicOverview": "schematicOverview 1",
								},
							],
						},
					}))
					.expect("Content-Type", /json/)
					.expect(400)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body.err[0].err).to.equal('"name" is required');
					});
			});

			it("Should create recycling process by id", async() => {
				return supertest(server)
					.post(`/api/recycling-processes`)
					.set("cookie", cookie)
					.send(({
						"data": {
							"name": "Test 120",
							"steps": [
								{
									"qualitativeDescription": {
										"text": "qualitativeDescription text 100",
										"asset": {
											"id": "",
											"mimetype": "",
											"uploadDate": "",
											"originalname": "",
										},
									},
									"_id": "5c49bbebe9fe3f0a757f0001",
									"precedingStep": "precedingStep 1",
									"description": "description 1",
									"site": "site 120",
									"methodOfProcessing": "methodOfProcessing 1",
									"schematicOverview": {
										"id": "",
										"mimetype": "",
										"uploadDate": "",
										"originalname": "",
									},
								},
							],
						},
					}))
					.expect("Content-Type", /json/)
					.expect(201)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body.data.name).to.equal("Test 120");
						expect(body.data.steps).to.be.an("array").to.have.lengthOf(1);
						expect(body.data.steps[0].site).to.equal("site 120");
					});
			});
		});
	});
});
