const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const nodemailerMock = require("nodemailer-mock");
const mockery = require("mockery");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const loginUser = require("../../helpers/loginUser");

describe("Integration", () => {
	describe("Send mail", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;

		before(async() => {
			mockery.enable({ warnOnUnregistered: true });
			mockery.registerMock("nodemailer", nodemailerMock);

			await createTestUser({
				email: "test1@example.com",
				isAdmin: true,
			});
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

			mockery.deregisterAll();
			mockery.disable();
		});

		it("Should not be able to sent an email when no subject is provided", () => {
			return supertest(server)
				.post("/api/contact/send-mail")
				.set("cookie", cookie)
				.send({
					email: "example@example.com",
					body: "some body",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should not be able to sent an email when no email is provided", () => {
			return supertest(server)
				.post("/api/contact/send-mail")
				.set("cookie", cookie)
				.send({
					subject: "subject",
					body: "some body",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should not be able to sent an email when no body is provided", () => {
			return supertest(server)
				.post("/api/contact/send-mail")
				.set("cookie", cookie)
				.send({
					email: "example@example.com",
					subject: "subject",
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});

		it("Should sent an email to all administrators", () => {
			return supertest(server)
				.post("/api/contact/send-mail")
				.set("cookie", cookie)
				.send({
					email: "example@example.com",
					subject: "Some subject",
					body: "Some body",
				})
				.expect("Content-Type", /json/)
				// .expect(200)
				.then(({ body }) => {
					expect(body).to.deep.equal({ success: true });

					const sentMail = nodemailerMock.mock.sentMail();

					const mail1 = sentMail.find((mail) => mail.to === "test1@example.com");
					const mail2 = sentMail.find((mail) => mail.to === "test2@example.com");

					expect(sentMail).to.have.lengthOf(2);
					expect(mail1).to.be.an("object");
					expect(mail1.to).to.equal("test1@example.com");
					expect(mail1.subject).to.equal("Rare | New contact message");
					expect(mail1.html).to.have.string("<!DOCTYPE html>");

					expect(mail2).to.be.an("object");
					expect(mail2.to).to.equal("test2@example.com");
					expect(mail2.subject).to.equal("Rare | New contact message");
					expect(mail2.html).to.have.string("<!DOCTYPE html>");
				});
		});
	});
});
