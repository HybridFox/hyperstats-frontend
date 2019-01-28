const expect = require("chai").expect;
const copy = require("./copy");

describe("Copy data middleware", () => {
	it("Should copy all data to req.data", (done) => {
		const req = {
			body: {
				key: "body",
			},
			headers: {
				key: "headers",
			},
			params: {
				key: "params",
			},
			query: {
				key: "query",
			},
		};
		const res = {};

		copy(req, res, () => {
			expect(req.data).to.exist;
			expect(req.data).to.be.an("object");
			expect(req.data).to.have.all.keys([
				"body",
				"headers",
				"params",
				"query",
			]);
			expect(req.data.body.key).to.equal("body");
			expect(req.data.headers.key).to.equal("headers");
			expect(req.data.params.key).to.equal("params");
			expect(req.data.query.key).to.equal("query");
			done();
		});
	});
});
