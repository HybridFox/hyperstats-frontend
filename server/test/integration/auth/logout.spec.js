const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const { omit } = require("ramda");

describe("Integration", () => {
	describe("Logout", () => {
		let server;
		let closeServer;
		let reset;

		before(async() => {
			const { server: s, closeServer: c, reset: r } = await startServer();
			server = s;
			closeServer = c;
			reset = r;
		});

		afterEach(() => reset());

		after(() => closeServer());

		it("Should logout user", async() => {
			let cookie;

			// Login user
			await supertest(server)
				.post("/api/auth/login")
				.send({
					email: "validuser@example.com",
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(200)
				.then((res) => cookie = res.header["set-cookie"][0]);

			// Check if user is logged in by getting profile
			await supertest(server)
				.get("/api/profile")
				.set("cookie", cookie)
				.expect("Content-Type", /json/)
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an("object");
					expect(omit(["created", "lastUpdated", "company"], body)).to.deep.equal({
						firstname: "__firstname_test-user__remove_identifier__",
						lastname: "Smith",
						status: {
							type: "PENDING",
						},
						isAdmin: false,
						email: "validuser@example.com",
					});
				});

			// Logout user
			await supertest(server)
				.get("/api/auth/logout")
				.set("cookie", cookie)
				.expect(201);

			// Check if user is logged out using get profile
			return supertest(server)
				.get("/api/profile")
				.set("cookie", cookie)
				.expect("Content-Type", /json/)
				.expect(403);
		});
	});
});
