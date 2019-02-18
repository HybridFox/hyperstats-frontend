const supertest = require("supertest");
const { expect } = require("chai");
const { omit } = require("ramda");
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
			it("Should not fetch recycling process by id", () => {
				return supertest(server)
					.get(`/api/recycling-processes/${mockRecyclingProcesses[0]._id}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should return 404 if recycling process doesn't exist", () => {
				return supertest(server)
					.get("/api/recycling-processes/2l42wkewe1fs4g3c734y5043")
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should fetch recycling process by id", async() => {
				return supertest(server)
					.get(`/api/recycling-processes/${mockRecyclingProcesses[0]._id}`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						console.log(body);
						expect(body).to.be.an("object");
						expect(omit(["__v"], body)).to.deep.equal({
							"_id": `${mockRecyclingProcesses[0]._id}`,
							"data": {
								"name": "Test 1",
								"steps": [
									{
										"_id": "5c49bbebe9fe3f0a757f0001",
										"uuid": "a991ec11-2ed6-4d04-a724-b8ba74b7ba7e",
										"description": "description 1",
										"methodOfProcessing": "methodOfProcessing 1",
										"precedingStep": "precedingStep 1",
										"qualitativeDescription": {
											"asset": {
												"id": "",
												"mimetype": "",
												"uploadDate": "",
												"originalname": "",
											},
											"text": "qualitativeDescription text 1",
										},
										"schematicOverview": {
											"id": "",
											"mimetype": "",
											"uploadDate": "",
											"originalname": "",
										},
										"site": "site 1",
									},
								],
							},
							"meta": {
								"deleted": false,
								"activated": false,
								"created": "2019-01-24T14:34:19.351Z",
								"lastUpdated": "2019-01-24T14:34:19.351Z",
							},
						});
					});
			});
		});
	});
});
