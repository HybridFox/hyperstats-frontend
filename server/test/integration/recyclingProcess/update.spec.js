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
			it("Should not update recycling process by id", () => {
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

			it("Should update recycling process by id", async() => {
				return supertest(server)
					.put(`/api/recycling-processes/${mockRecyclingProcesses[0]._id}`)
					.set("cookie", cookie)
					.send(({
						"data": {
							"name": "Test 100",
							"steps": [
								{
									"qualitativeDescription": {
										"text": "qualitativeDescription text 100",
										"asset": " qualitativeDescription asset 1",
									},
									"_id": "5c49bbebe9fe3f0a757f0001",
									"precedingStep": "precedingStep 1",
									"description": "description 1",
									"site": "site 100",
									"methodOfProcessing": "methodOfProcessing 1",
									"schematicOverview": "schematicOverview 1",
								},
							],
						},
						"meta": {
							"created": "2019-01-24T14:34:19.351Z",
							"lastUpdated": "2019-01-24T14:34:19.351Z",
						},
						"_id": "wefewfewfwegergeg", // id can't change!
						"__v": 0,
					}))
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body._id).to.equal(mockRecyclingProcesses[0]._id);
						expect(body.data.name).to.equal("Test 100");
						expect(body.data.steps).to.be.an("array").to.have.lengthOf(1);
						expect(body.data.steps[0].site).to.equal("site 100");
					});
			});
		});
	});
});
