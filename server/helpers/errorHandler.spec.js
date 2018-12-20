const expect = require("chai").expect;

const errorHandler = require("./errorHandler");
const ValidationError = require("./validationError");

describe("Error handler helper", () => {
	it("Should return an error with stack", (done) => {
		const err = new TypeError("Random error");
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 400);
		expect(result).to.have.property("msg", "TypeError occured. See the stack for more information.");
		expect(result).to.have.property("stack");

		done();
	});

	it("Should return the error when the object validation failed with errors", (done) => {
		const err = new ValidationError("OBJECT_VALIDATION_FAILED", {
			details: [{
				message: "Some error.",
			}],
		});
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 400);
		expect(result).to.have.property("msg").to.be.an("array").to.have.lengthOf(1);
		expect(result.msg[0]).to.have.property("err", "Some error.");

		done();
	});

	it("Should return the error when the object validation failed without errors", (done) => {
		const err = new ValidationError("OBJECT_VALIDATION_FAILED");
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 400);
		expect(result).to.have.property("msg").to.be.an("array").to.have.lengthOf(0);

		done();
	});

	it("Should return the forbidden error", (done) => {
		const err = new Error("FORBIDDEN");
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 403);
		expect(result).to.have.property("msg", "Forbidden.");

		done();
	});

	it("Should return the missing authorization error", (done) => {
		const err = new Error("MISSING_AUTHORIZATION");
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 401);
		expect(result).to.have.property("msg", "Not authorized.");

		done();
	});

	it("Should return the item not found error", (done) => {
		const err = new Error("ITEM_NOT_FOUND");
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 404);
		expect(result).to.have.property("msg", "Item not found.");

		done();
	});

	it("Should return the default error", (done) => {
		const err = "Random error";
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 500);
		expect(result).to.have.property("msg", "Something unexpected happened.");

		done();
	});

	it("Should return the thrown error when not known", (done) => {
		const err = new Error("Random error");
		const result = errorHandler.create(err);

		expect(result).to.be.an("object");
		expect(result).to.have.property("statusCode", 500);
		expect(result).to.have.property("msg", "Random error");

		done();
	});
});
