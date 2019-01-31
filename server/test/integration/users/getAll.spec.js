const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const loginUser = require("../../helpers/loginUser");

describe("Integration", () => {
	describe("Users", () => {
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
			await createTestUser({
				email: "test3@example.com",
				isAdmin: false,
			});
			await createTestUser({
				email: "test4@example.com",
				isAdmin: false,
			});

			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			cookie = (await loginUser(server)).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com", "test2@example.com", "test3@example.com", "test4@example.com"]);
			await closeServer();
		});

		describe("When not logged in", () => {
			it("Should not fetch users", () => {
				return supertest(server)
					.get("/api/users")
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should fetch users", async() => {
				return supertest(server)
					.get("/api/users")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(5);
						expect(body[0].data).to.deep.equal({
							email: "test1@example.com",
							firstname: "__firstname_test-user__remove_identifier__",
							lastname: "Smith",
						});
					});
			});
		});
	});
});
