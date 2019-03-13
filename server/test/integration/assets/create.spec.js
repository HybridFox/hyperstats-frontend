const supertest = require("supertest");
const { expect } = require("chai");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const loginUser = require("../../helpers/loginUser");
const errors = require("../../../helpers/errorHandler");

describe("Integration", () => {
	describe("Assets", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;

		before(async() => {
			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com", "test2@example.com"]);
			await closeServer();

			// Clear file storage
			const bucket = new mongodb.GridFSBucket(mongoose.connection.db);
			await bucket.drop();
		});

		describe("When not logged in", () => {
			it("Should not create recycling process by id", () => {
				return supertest(server)
					.post(`/api/assets`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", async() => {
			it("Should return validation error", async() => {
				cookie = (await loginUser(server)).cookie;

				return supertest(server)
					.post(`/api/assets`)
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(400)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body.err).to.equal('"file" is required.');
					});
			});

			it("Should create recycling process by id", async() => {
				cookie = (await loginUser(server)).cookie;

				return supertest(server)
					.post(`/api/assets`)
					.set("cookie", cookie)
					.attach("file", "./test/mocks/google.png")
					.expect("Content-Type", /json/)
					.expect(201)
					.then(({ body }) => {
						expect(body).to.be.an("object");
						expect(body.mimetype).to.equal("image/png");
						expect(body.originalname).to.equal("google.png");
					});
			});
		});
	});
});
