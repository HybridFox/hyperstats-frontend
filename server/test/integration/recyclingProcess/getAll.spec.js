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
				password: "Something123",
				isAdmin: true,
			});
			secondUser = await createTestUser({
				email: "test2@example.com",
				password: "Something123",
				isAdmin: true,
			});

			mockRecyclingProcesses = mockProcesses(firstUser.data.company);

			await clearData("recyclingProcess");
			await insertData("recyclingProcess", mockRecyclingProcesses);

			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			cookie = (await loginUser(server, {
				username: "test1@example.com",
				password: "Something123",
			})).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers([firstUser.data.email, secondUser.data.email]);
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
						expect(body[0].data).to.deep.equal(mockRecyclingProcesses[0].data);
						expect(body[0].meta.createdByCompany.toString()).to.equal(mockRecyclingProcesses[0].meta.createdByCompany.toString());
					});
			});
		});
	});
});
