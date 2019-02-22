const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const loginUser = require("../../helpers/loginUser");
const UserModel = require("../../../models/user");

describe("Integration", () => {
	describe("Users", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;
		let nonAdminCookie;
		let userId;

		before(async() => {
			const result = await createTestUser({
				email: "test1@example.com",
				isAdmin: true,
			});
			userId = result._id;
			await createTestUser({
				email: "test2@example.com",
				isAdmin: true,
			});

			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			cookie = (await loginUser(server, { email: "test1@example.com" })).cookie;
			nonAdminCookie = (await loginUser(server)).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com", "test2@example.com"]);
			await closeServer();
		});

		describe("When not logged in", () => {
			it("Should update user company by id", () => {
				return supertest(server)
					.patch(`/api/users/${userId}/company`)
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should update user company by id", async() => {
				return supertest(server)
					.patch(`/api/users/${userId}/company`)
					.set("cookie", cookie)
					.send({
						company: "507f1f77bcf86cd799439011",
					})
					.expect("Content-Type", /json/)
					.expect(200)
					.then(async({ body }) => {
						expect(body).to.be.an("object");
						expect(body._id).to.equal(userId.toString());

						const res = await UserModel.findOne({ _id: userId }).lean().exec();
						expect(res.data.company.toString()).to.equal("507f1f77bcf86cd799439011");
					});
			});

			it("Should fail to update user company by id if user in session is not admin", async() => {
				return supertest(server)
					.patch(`/api/users/${userId}/company`)
					.set("cookie", nonAdminCookie)
					.send({
						company: "507f1f77bcf86cd799439011",
					})
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});
	});
});
