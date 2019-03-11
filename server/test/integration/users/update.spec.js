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
			await removeTestUsers(["test2@example.com", "joske.janssens.be"]);
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
							"firstname": "__firstname_test-user__remove_identifier__",
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
						expect(body.data.firstname).to.equal("__firstname_test-user__remove_identifier__");
						expect(body.data.lastname).to.equal("Janssens");
					});
			});

			it("Should fail to update user by id of user in session is not admin", async() => {
				return supertest(server)
					.put(`/api/users/${userId}`)
					.set("cookie", nonAdminCookie)
					.send({
						"data": {
							"firstname": "__firstname_test-user__remove_identifier__",
							"lastname": "Janssens",
							"email": "joske.janssens.be",
						},
					})
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});
	});
});
