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
			it("Should not fetch recycling processes", () => {
				return supertest(server)
					.get("/api/recycling-processes")
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should fetch recycling processes", async() => {
				return supertest(server)
					.get("/api/recycling-processes")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(mockRecyclingProcesses.length);
						expect(omit(["__v"], body[0])).to.deep.equal({
							"_id": "5c49ccebe9fe3f0a757f0001",
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
											"asset": " qualitativeDescription asset 1",
											"text": "qualitativeDescription text 1",
										},
										"schematicOverview": "schematicOverview 1",
										"site": "site 1",
									},
								],
							},
							"meta": {
								"created": "2019-01-24T14:34:19.351Z",
								"lastUpdated": "2019-01-24T14:34:19.351Z",
							},
						});
					});
			});
		});
	});
});
