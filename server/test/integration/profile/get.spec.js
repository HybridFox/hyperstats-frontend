const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const { omit } = require("ramda");

describe("Integration", () => {
	describe("Profile get", () => {
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

		it("Should not be able to get profile when not loggedIn", () => {
			return supertest(server)
				.get("/api/profile")
				.expect("Content-Type", /json/)
				.expect(403);
		});

		it("Should get profile when logged in", async() => {
			let cookie;

			await supertest(server)
				.post("/api/auth/login")
				.send({
					email: "validuser@example.com",
					password: "validPassword",
				})
				.expect("Content-Type", /json/)
				.expect(200)
				.then((res) => cookie = res.header["set-cookie"][0]);

			return supertest(server)
				.get("/api/profile")
				.set("cookie", cookie)
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
	});
});
