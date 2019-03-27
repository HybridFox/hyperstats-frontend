const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const mockProcesses = require("../../mocks/recyclingProcesses");
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
		let firstUser;
		let secondUser;
		let mockRecyclingProcesses;

		before(async() => {
			firstUser = await createTestUser({
				email: "test1@example.com",
				isAdmin: true,
			});
			secondUser = await createTestUser({
				email: "test2@example.com",
				isAdmin: true,
			});

			mockRecyclingProcesses = mockProcesses(firstUser.data.company);

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
			await removeTestUsers([firstUser.data.email, secondUser.data.email]);
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
						expect(body).to.be.an("object");
						expect(body.data).to.deep.equal(mockRecyclingProcesses[0].data);
					});
			});
		});
	});
});
