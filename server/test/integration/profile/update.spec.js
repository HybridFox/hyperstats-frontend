const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");

describe("Integration", () => {
	describe("Profile update", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;
		let lastUpdated;

		before(async() => {
			const { server: s, closeServer: c, reset: r } = await startServer();
			server = s;
			closeServer = c;
			reset = r;

			await supertest(server)
				.post("/api/auth/login")
				.send({
					username: "validuser@example.com",
					password: "validPassword",
				})
				.expect(200)
				.expect("Content-Type", /json/)
				.then(({ headers, body }) => {
					cookie = headers["set-cookie"][0];
					lastUpdated = body.lastUpdated;
				});
		});

		afterEach(() => reset());

		after(() => closeServer());

		it("Should not be able to update profile while not logged in", () => {
			return supertest(server)
				.put("/api/profile")
				.send({
					firstname: "firstnameUpdated",
					lastname: "lastnameUpdated",
				})
				.expect("Content-Type", /json/)
				.expect(403);
		});

		it("Should return a validation error when no firstname is passed", () => {
			return supertest(server)
				.put("/api/profile")
				.set("cookie", cookie)
				.send({
					lastname: "lastnameUpdated",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should return a validation error when no firstname is passed", () => {
			return supertest(server)
				.put("/api/profile")
				.set("cookie", cookie)
				.send({
					firstname: "firstnameUpdated",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});


		// TODO: Check DB for change
		it("Should update profile", async() => {
			const { body: updateBody } = await supertest(server)
				.put("/api/profile")
				.set("cookie", cookie)
				.send({
					firstname: "firstnameUpdated",
					lastname: "lastnameUpdated",
				})
				.expect("Content-Type", /json/)
				.expect(200);

			const { body: profileBody } = await supertest(server)
				.get("/api/profile")
				.set("cookie", cookie)
				.expect("Content-Type", /json/)
				.expect(200);

			expect(updateBody).to.be.an("object");
			expect(updateBody.firstname).to.equal("firstnameUpdated");
			expect(updateBody.lastname).to.equal("lastnameUpdated");
			expect(updateBody.email).to.equal("validuser@example.com");
			expect(updateBody.lastUpdated).to.not.equal(lastUpdated);

			expect(profileBody).to.be.an("object");
			expect(profileBody.firstname).to.equal("firstnameUpdated");
			expect(profileBody.lastname).to.equal("lastnameUpdated");
			expect(profileBody.email).to.equal("validuser@example.com");
			expect(profileBody.lastUpdated).to.not.equal(lastUpdated);
		});
	});
});
