const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const { omit } = require("ramda");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");

describe("Integration", () => {
	describe("Reset password", () => {
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

			// Create password modify test user
			await createTestUser({ email: "passwordreset@example.com" });

			await supertest(server).get("/api/auth/logout");
		});

		afterEach(() => reset());

		after(async() => {
			await closeServer();
			await removeTestUsers(["passwordreset@example.com"]);
		});

		it("Should not be able to request a new password when no email is provided", () => {
			return supertest(server)
				.post("/api/auth/request-password-reset")
				.send({})
				.expect(400);
		});

		it("Should not be able to request a new password when an invalid email is provided", () => {
			return supertest(server)
				.post("/api/auth/request-password-reset")
				.send({
					emaiusernamel: "Invalid email",
				})
				.expect(400);
		});

		it("Should fail to reset password when invalid token is passed", () => {
			return supertest(server)
				.put("/api/auth/reset-password")
				.send({
					password: "newPassword",
					token: "invalid token",
				})
				.expect(400);
		});

		const resetPasswordTest = () => {
			let token;

			it("Should request a password reset", () => supertest(server)
				.post("/api/auth/request-password-reset")
				.send({
					username: "passwordreset@example.com",
				})
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an("object");
					expect(body.success).to.be.true;

					const sentMail = nodemailerMock.mock.sentMail();

					expect(sentMail).to.have.lengthOf(1);
					expect(sentMail[0].to).to.equal("passwordreset@example.com");

					// Get verify token from e-mail
					const myRegexp = /\/reset-password\?token=(.*)"/g;
					const match = myRegexp.exec(sentMail[0].html);

					token = match[1];
				})
			);

			it("Should reset the password", () => supertest(server)
				.put("/api/auth/reset-password")
				.send({
					password: "newPassword",
					token,
				})
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an("object");
					expect(body.success).to.be.true;
				})
			);

			it("Should login with the new password", () => supertest(server)
				.post("/api/auth/login")
				.send({
					username: "passwordreset@example.com",
					password: "newPassword",
				})
				.expect(200)
				.then((res) => {
					expect(res.body).to.be.an("object");
					expect(omit(["created", "lastUpdated", "company"], res.body)).to.deep.equal({
						firstname: "__firstname_test-user__remove_identifier__",
						lastname: "Smith",
						status: {
							type: "ACTIVATED",
						},
						isAdmin: false,
						email: "passwordreset@example.com",
						username: "passwordreset@example.com",
					});
				})
			);
		};

		describe("Should reset the password", () => resetPasswordTest());
		describe("Should reset the password a second time", () => resetPasswordTest());
	});
});
