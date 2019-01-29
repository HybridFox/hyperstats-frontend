const supertest = require("supertest");
const mongodb = require("mongodb");
const fs = require("fs");
const mongoose = require("mongoose");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const loginUser = require("../../helpers/loginUser");
const { ObjectId } = require("mongodb");

const createAsset = () => {
	return new Promise((resolve, reject) => {
		const bucket = new mongodb.GridFSBucket(mongoose.connection.db);
		fs.createReadStream("./test/mocks/google.png")
			.pipe(bucket.openUploadStreamWithId(ObjectId("5c4eed617653ae04536439a6"), "google.png", {
				contentType : "image/png",
				metadata: {
					originalname: "google.png",
				},
			}))
			.on("error", reject)
			.on("finish", () => {
				resolve();
			});
	});
};

describe("Integration", () => {
	describe("Assets", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;

		before(async() => {
			await createTestUser({
				email: "test1@example.com",
				isAdmin: true,
			});

			// Add file to storage
			await createAsset();

			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			cookie = (await loginUser(server)).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com"]);
			await closeServer();

			// Clear file storage
			const bucket = new mongodb.GridFSBucket(mongoose.connection.db);
			await bucket.drop();
		});

		describe("When not logged in", () => {
			it("Should not fetch asset by id", () => {
				return supertest(server)
					.get(`/api/assets/5c4eed617653ae04536439a6`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should return 404 if asset doesn't exist", () => {
				return supertest(server)
					.get("/api/assets/5c4eed617653ae04536439a2")
					.expect("Content-Type", /json/)
					.expect(403);
			});

			it("Should fetch asset by id", async() => {
				return supertest(server)
					.get(`/api/assets/5c4eed617653ae04536439a6`)
					.set("cookie", cookie)
					.expect(200)
					.expect("Content-Type", "image/png");
			});

			it("Should download asset by id", async() => {
				return supertest(server)
					.get(`/api/assets/5c4eed617653ae04536439a6?download`)
					.set("cookie", cookie)
					.expect(200)
					.expect("Content-Type", "image/png")
					.expect("Content-Disposition", "attachment; filename=\"google.png\"");
			});
		});
	});
});
