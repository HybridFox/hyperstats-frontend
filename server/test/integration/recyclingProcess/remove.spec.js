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
			it("Should not remove recycling process by id", () => {
				return supertest(server)
					.get(`/api/recycling-processes/${mockRecyclingProcesses[0]._id}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should remove recycling process by id", async() => {
				return supertest(server)
					.delete(`/api/recycling-processes/${mockRecyclingProcesses[0]._id}`)
					.set("cookie", cookie)
					.expect(204)
					.then(() => {
						return supertest(server)
							.get("/api/recycling-processes")
							.set("cookie", cookie)
							.expect("Content-Type", /json/)
							.expect(200)
							.then(({ body }) => {
								expect(body).to.be.an("array").to.have.lengthOf(mockRecyclingProcesses.length - 1);
							});
					});
			});
		});
	});
});
