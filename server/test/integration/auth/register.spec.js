const supertest = require("supertest");
const startServer = require("../../mocks/startServer");
const { expect } = require("chai");
const { omit } = require("ramda");
const removeTestUsers = require("../../helpers/removeTestUsers");

describe("Integration", () => {
	describe("Register", () => {
		let server;
		let closeServer;
		let reset;
		let nodemailerMock;

		before(async() => {
			const { server: s, closeServer: c, reset: r, nodemailerMock: n } = await startServer();
			server = s;
			closeServer = c;
			reset = r;
			nodemailerMock = n;
		});

		afterEach(() => reset());

		after(async() => {
			await closeServer();
			await removeTestUsers(["otherUser@example.com"]);
		});

		it("Should not be able to get register user with an email that already exists", () => {
			return supertest(server)
				.post("/api/auth/register")
				.send({
					email: "validuser@example.com",
					password: "somePassword",
					firstname: "Jon",
					lastname: "Smith",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should not be able to get register user when no email is passed", () => {
			return supertest(server)
				.post("/api/auth/register")
				.send({
					password: "somePassword",
					firstname: "Jon",
					lastname: "Smith",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should not be able to get register user when no password is passed", () => {
			return supertest(server)
				.post("/api/auth/register")
				.send({
					email: "validuser@example.com",
					firstname: "Jon",
					lastname: "Smith",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should not be able to get register user when no firstname is passed", () => {
			return supertest(server)
				.post("/api/auth/register")
				.send({
					email: "validuser@example.com",
					password: "somePassword",
					lastname: "Smith",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should not be able to get register user when no lastname is passed", () => {
			return supertest(server)
				.post("/api/auth/register")
				.send({
					email: "validuser@example.com",
					password: "somePassword",
					firstname: "Jon",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should register user", async() => {
			let token;
			let cookie;

			// Register user
			await supertest(server)
				.post("/api/auth/register")
				.send({
					email: "otherUser@example.com",
					password: "somePassword",
					firstname: "Jef",
					lastname: "Awesome",
				})
				.expect("Content-Type", /json/)
				.expect(200)
				.then((res) => {
					expect(res.body).to.be.an("object");
					expect(res.body.success).to.be.true;

					const sentMail = nodemailerMock.mock.sentMail();

					expect(sentMail).to.have.lengthOf(1);
					expect(sentMail[0].to).to.equal("otherUser@example.com");

					// Get verify token from e-mail
					const myRegexp = /\/api\/auth\/verify\?token=(.*)"/g;
					const match = myRegexp.exec(sentMail[0].html);

					token = match[1];
				});

			// Validate user
			await supertest(server)
				.get(`/api/auth/verify?token=${token}`)
				.expect(302)
				.then((res) => {
					expect(res.headers.location).to.include("/verification-succeeded");
					cookie = res.headers["set-cookie"][0];
				});

			// Check if user is logged in
			return supertest(server)
				.get("/api/profile")
				.set("cookie", cookie)
				.expect("Content-Type", /json/)
				.expect(200)
				.then((res) => {
					expect(res.body).to.be.an("object");
					expect(omit(["created", "lastUpdated"], res.body)).to.deep.equal({
						email: "otherUser@example.com",
						firstname: "Jef",
						lastname: "Awesome",
					});
				});
		});

		it("Should fail on bad verify token", () => {
			return supertest(server)
				.get("/api/auth/verify?token=badtoken")
				.expect(302)
				.then((res) => {
					expect(res.headers.location).to.include("/verification-failed");
				});
		});
	});
});
