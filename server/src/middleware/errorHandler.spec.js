const expect = require("chai").expect;

const errorHandler = require("./errorHandler");

describe("Error handler middleware", () => {
	it("Should skip if there is no error", (done) => {
		errorHandler(null, null, null, (err) => {
			expect(err).to.be.undefined;
			done();
		});
	});

	it("Should return a custom error message", (done) => {
		const err = {
			message: "Custom error message",
		};
		const req = {};
		const res = {
			status: (statusCode) => {
				expect(statusCode).to.be.equal(500);

				return {
					json: (body) => {
						expect(body).to.be.an("object");
						expect(body).to.have.property("err", err.message);
						done();
					},
				};
			},
		};
		const next = require("./errorHandler");

		errorHandler(err, req, res, next);
	});

	it("Should do nothing when the headers are already sent", (done) => {
		const err = "Some error message";
		const req = {};
		const res = {
			headersSent: true,
			status: (statusCode) => {
				expect(statusCode).to.be.equal(500);

				return {
					json: (body) => {
						expect(body).to.be.an("object");
						expect(body).to.have.property("err", err.message);
						done();
					},
				};
			},
		};
		const next = require("./errorHandler");

		const result = errorHandler(err, req, res, next);

		expect(result).to.be.undefined;

		done();
	});
});
