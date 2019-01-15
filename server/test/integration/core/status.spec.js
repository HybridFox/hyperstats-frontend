const supertest = require("supertest");
const { expect } = require("chai");
const packageJson = require("../../../package.json");
const startServer = require("../../mocks/startServer");

describe("Integration", () => {
	describe("Status", () => {
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

		it("Should return the status of the server", () => {
			return supertest(server)
				.get("/api/status")
				.expect("Content-Type", /json/)
				.expect(200)
				.then((res) => {
					expect(res.body).to.be.an("object");
					expect(res.body.version).to.equal(packageJson.version);
					expect(res.body.success).to.be.true;
				});
		});
	});
});
