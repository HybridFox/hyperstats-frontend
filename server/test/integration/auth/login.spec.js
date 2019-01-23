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
					email: "validuser@example.com",
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(200)
				.then((res) => {
					expect(res.body).to.be.an("object");
					expect(omit(["created", "lastUpdated"], res.body)).to.deep.equal({
						firstname: "validUser",
						lastname: "Smith",
						isAdmin: false,
						email: "validuser@example.com",
					});
				});
		});

		it("Should fail to login the user when invalid email is passed", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					email: "invalidUser@example.com",
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(404);
		});

		it("Should fail to login the user when invalid password is passed", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					email: "validuser@example.com",
					password: "invalidPassword",
				})
				.expect("Content-Type", /json/)
				.expect(404);
		});

		it("Should fail to login the user when no password is set", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					email: "validuser@example.com",
				})
				.expect("Content-Type", /json/)
				.expect(404);
		});

		it("Should fail to login the user when no email is set", () => {
			return supertest(server)
				.post("/api/auth/login")
				.send({
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(404);
		});
	});
});
