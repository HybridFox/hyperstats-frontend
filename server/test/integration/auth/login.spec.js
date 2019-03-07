const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const { omit } = require("ramda");

describe("Integration", () => {
	describe("Login", () => {
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

		it("Should login the user", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					username: "validuser@example.com",
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an("object");
					expect(omit(["created", "lastUpdated", "company"], body)).to.deep.equal({
						firstname: "__firstname_test-user__remove_identifier__",
						lastname: "Smith",
						isAdmin: false,
						username: "validuser@example.com",
						email: "validuser@example.com",
						status: {
							type: "ACTIVATED",
						},
					});
					expect(body.company).to.be.an("object");
					expect(body.company.data).to.be.an("object");
					expect(body.company.data.name).to.equal("Company for user");
				});
		});

		it("Should fail to login the user when invalid email is passed", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					username: "invalidUser@example.com",
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(404);
		});

		it("Should fail to login the user when invalid password is passed", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					username: "validuser@example.com",
					password: "invalidPassword",
				})
				.expect("Content-Type", /json/)
				.expect(404);
		});

		it("Should fail to login the user when no password is set", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					username: "validuser@example.com",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should fail to login the user when no email is set", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});
	});
});
