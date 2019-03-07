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
		let nonAdminCookie;
		let userId;

		before(async() => {
			const result = await createTestUser({
				email: "test1@example.com",
				isAdmin: true,
			});
			userId = result._id;
			await createTestUser({
				email: "test2@example.com",
				isAdmin: true,
			});

			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			cookie = (await loginUser(server, { username: "test1@example.com" })).cookie;
			nonAdminCookie = (await loginUser(server)).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com", "test2@example.com"]);
			await closeServer();
		});

		describe("When not logged in", () => {
			it("Should not fetch user by id", () => {
				return supertest(server)
					.get(`/api/users/${userId}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should fetch user by id", async() => {
				return supertest(server)
					.get(`/api/users/${userId}`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body._id).to.equal(userId.toString());
						expect(body.data.email).to.equal("test1@example.com");
					});
			});

			it("Should fail to fetch user by id if user in session is not admin", async() => {
				return supertest(server)
					.get(`/api/users/${userId}`)
					.set("cookie", nonAdminCookie)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});
	});
});
