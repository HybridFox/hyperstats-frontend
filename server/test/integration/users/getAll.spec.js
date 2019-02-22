const supertest = require("supertest");
const { expect } = require("chai");
const { dissoc, set, lensPath } = require("ramda");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const loginUser = require("../../helpers/loginUser");
const testCompany = require("../../helpers/testCompany");
const companyMock = require("../../mocks/company");

describe("Integration", () => {
	describe("Users", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;
		let rp;
		let co;

		before(async() => {
			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			const baseCompany = dissoc("_id", companyMock);

			rp = await testCompany.create(set(lensPath(["meta", "type"]), "RP")(baseCompany));
			co = await testCompany.create(set(lensPath(["meta", "type"]), "CO")(baseCompany));

			await createTestUser({
				email: "test1@example.com",
				isAdmin: true,
			});
			await createTestUser({
				email: "test2@example.com",
				isAdmin: true,
			});
			await createTestUser({
				email: "test3@example.com",
				isAdmin: false,
				company: rp._id,
			});
			await createTestUser({
				email: "test4@example.com",
				isAdmin: false,
				company: rp._id,
			});
			await createTestUser({
				email: "test5@example.com",
				isAdmin: false,
				company: co._id,
			});
			await createTestUser({
				email: "test6@example.com",
				isAdmin: false,
				company: co._id,
			});

			cookie = (await loginUser(server)).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test1@example.com", "test2@example.com", "test3@example.com", "test4@example.com", "test5@example.com", "test6@example.com"]);
			await closeServer();
		});

		describe("When not logged in", () => {
			it("Should not fetch users", () => {
				return supertest(server)
					.get("/api/users")
					.expect("Content-Type", /json/)
					.expect(403);
			});
		});

		describe("When logged in", () => {
			it("Should fetch users", async() => {
				return supertest(server)
					.get("/api/users")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(7);
						expect(body[0].data).to.deep.equal({
							email: "validuser@example.com",
							firstname: "__firstname_test-user__remove_identifier__",
							lastname: "Smith",
						});
					});
			});

			it("Should fetch users by recycler type", () => {
				return supertest(server)
					.get("/api/users?company-type=R")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(1);
						expect(body[0].data).to.deep.equal({
							email: "validuser@example.com",
							firstname: "__firstname_test-user__remove_identifier__",
							lastname: "Smith",
						});
					});
			});

			it("Should fetch admin users", () => {
				return supertest(server)
					.get("/api/users?admin=true")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(2);
						expect(body[0].data).to.deep.equal({
							email: "test1@example.com",
							firstname: "__firstname_test-user__remove_identifier__",
							lastname: "Smith",
						});
					});
			});

			it("Should fetch admin users and of type recycler and compliance organisation", () => {
				return supertest(server)
					.get("/api/users?admin=true&company-type=R&company-type=CO")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(5);
						expect(body[0].data).to.deep.equal({
							email: "validuser@example.com",
							firstname: "__firstname_test-user__remove_identifier__",
							lastname: "Smith",
						});
					});
			});

			it("Should fetch users by recycler partner type", () => {
				return supertest(server)
					.get("/api/users?company-type=RP")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(2);
						expect(body[0].data).to.deep.equal({
							email: "test3@example.com",
							firstname: "__firstname_test-user__remove_identifier__",
							lastname: "Smith",
						});
					});
			});

			it("Should fetch users by recycler process type", () => {
				return supertest(server)
					.get("/api/users?company-type=CO")
					.set("cookie", cookie)
					.expect("Content-Type", /json/)
					.expect(200)
					.then(({ body }) => {
						expect(body).to.be.an("array").to.have.lengthOf(2);
						expect(body[0].data).to.deep.equal({
							email: "test5@example.com",
							firstname: "__firstname_test-user__remove_identifier__",
							lastname: "Smith",
						});
					});
			});
		});
	});
});
