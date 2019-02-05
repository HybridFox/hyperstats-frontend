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

			cookie = (await loginUser(server)).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com", "test2@example.com"]);
			await closeServer();
		});

		describe("When not logged in", () => {
			it("Should update user by id", () => {
				return supertest(server)
					.put(`/api/users/${userId}`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should update user by id", async() => {
				return supertest(server)
					.put(`/api/users/${userId}`)
					.set("cookie", cookie)
					.send({
						"data": {
							"firstname": "Joske",
							"lastname": "Janssens",
							"email": "joske.janssens.be",
						},
					})
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body._id).to.equal(userId.toString());
						expect(body.data.email).to.equal("joske.janssens.be");
						expect(body.data.firstname).to.equal("Joske");
						expect(body.data.lastname).to.equal("Janssens");
					});
			});
		});
	});
});
