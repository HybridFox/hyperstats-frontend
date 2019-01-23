const supertest = require("supertest");
const { expect } = require("chai");
const startServer = require("../../mocks/startServer");
const createTestUser = require("../../helpers/createTestUser");
const removeTestUsers = require("../../helpers/removeTestUsers");
const companyTestHelper = require("../../helpers/testCompany");
const companyMock = require("../../mocks/company");
const loginUser = require("../../helpers/loginUser");

describe("Integration", () => {
	describe("Company update", () => {
		let server;
		let closeServer;
		let reset;
		let cookie;

		before(async() => {
			const { server: s, closeServer: c, reset: r } = await startServer();

			server = s;
			closeServer = c;
			reset = r;

			await companyTestHelper.create();
			await createTestUser({
				email: "test_company_user@example.com",
				company: companyMock._id,
			});

			cookie = (await loginUser(server, { email: "test_company_user@example.com" })).cookie;
		});

		afterEach(() => reset());

		after(async() => {
			await removeTestUsers(["test_company_user@example.com"]);
			await companyTestHelper.remove();
			await closeServer();
		});

		it("Should not be able to update your company while not logged in", () => {
			return supertest(server)
				.put("/api/profile/company")
				.send({
					name: "firstnameUpdated",
					address: {
						street: "updated street",
						number: "updated number",
						box: "updated box",
						zipCode: "0",
						city: "wahala",
						country: "WA",
					},
				})
				.expect("Content-Type", /json/)
				.expect(403);
		});

		it("Should return a validation error when no name is passed", () => {
			return supertest(server)
				.put("/api/profile/company")
				.set("cookie", cookie)
				.send({
					address: {
						street: "updated street",
						number: "updated number",
						box: "updated box",
						zipCode: "0",
						city: "wahala",
						country: "WA",
					},
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});


		it("Should return a validation error when no street is passed", () => {
			return supertest(server)
				.put("/api/profile/company")
				.set("cookie", cookie)
				.send({
					name: "firstnameUpdated",
					address: {
						number: "updated number",
						box: "updated box",
						zipCode: "0",
						city: "wahala",
						country: "WA",
					},
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});


		it("Should return a validation error when no number is passed", () => {
			return supertest(server)
				.put("/api/profile/company")
				.set("cookie", cookie)
				.send({
					name: "firstnameUpdated",
					address: {
						street: "updated street",
						box: "updated box",
						zipCode: "0",
						city: "wahala",
						country: "WA",
					},
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});


		it("Should return a validation error when no zip code is passed", () => {
			return supertest(server)
				.put("/api/profile/company")
				.set("cookie", cookie)
				.send({
					name: "firstnameUpdated",
					address: {
						street: "updated street",
						number: "updated number",
						box: "updated box",
						city: "wahala",
						country: "WA",
					},
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});


		it("Should return a validation error when no city is passed", () => {
			return supertest(server)
				.put("/api/profile/company")
				.set("cookie", cookie)
				.send({
					name: "firstnameUpdated",
					address: {
						street: "updated street",
						number: "updated number",
						box: "updated box",
						zipCode: 0,
						country: "WA",
					},
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});


		it("Should return a validation error when no name is passed", () => {
			return supertest(server)
				.put("/api/profile/company")
				.set("cookie", cookie)
				.send({
					name: "firstnameUpdated",
					address: {
						street: "updated street",
						number: "updated number",
						box: "updated box",
						zipCode: "0",
						city: "wahala",
					},
				})
				.expect("Content-Type", /json/)
				.expect(400);
		});


		it("Should update company", () => {
			return supertest(server)
				.put("/api/profile/company")
				.set("cookie", cookie)
				.send({
					name: "updated name",
					address: {
						street: "updated street",
						number: companyMock.data.address.number,
						box: "updated box",
						zipCode: "0",
						city: "wahala",
						country: "WA",
					},
				})
				.expect("Content-Type", /json/)
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an("object");
					expect(body.data).to.be.an("object");
					expect(body.meta).to.be.an("object");
					expect(body.data.name).to.equal("updated name");
					expect(body.data.address).to.be.an("object");
					expect(body.data.address.street).to.equal("updated street");
					expect(body.data.address.number).to.equal(companyMock.data.address.number);
				});
		});
	});
});
