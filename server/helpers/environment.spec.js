const expect = require("chai").expect;
const EnvironmentHelper = require("./environment");

describe("Environment helper", () => {
	it("Should throw an error when NODE_ENV is not valid", (done) => {
		const env = {
			NODE_ENV: "invalid",
		};

		expect(() => {
			EnvironmentHelper(env);
		}).to.throw(Error, "NODE_ENV_NOT_VALID");

		done();
	});

	it("Should see if the `local` environment is valid", (done) => {
		const env = {
			NODE_ENV: "local",
		};

		expect(() => {
			EnvironmentHelper(env);
		}).to.not.throw(Error);

		done();
	});

	it("Should see if the `test` environment is valid", (done) => {
		const env = {
			NODE_ENV: "test",
		};

		expect(() => {
			EnvironmentHelper(env);
		}).to.not.throw(Error);

		done();
	});

	it("Should see if the `development` environment is valid", (done) => {
		const env = {
			NODE_ENV: "development",
		};

		expect(() => {
			EnvironmentHelper(env);
		}).to.not.throw(Error);

		done();
	});

	it("Should see if the `staging` environment is valid", (done) => {
		const env = {
			NODE_ENV: "staging",
		};

		expect(() => {
			EnvironmentHelper(env);
		}).to.not.throw(Error);

		done();
	});

	it("Should see if the `production` environment is valid", (done) => {
		const env = {
			NODE_ENV: "production",
		};

		expect(() => {
			EnvironmentHelper(env);
		}).to.not.throw(Error);

		done();
	});

	it("Should set the environment to the default environment when missing", (done) => {
		const env = {};

		EnvironmentHelper(env);

		expect(process.env.NODE_ENV).to.be.a("string");
		expect(process.env.NODE_ENV).to.be.equal("local");
		done();
	});
});
