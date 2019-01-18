const compiler = require("./index");
const { expect } = require("chai");

describe("compiler", () => {
	it("Should compile a template", async() => {
		const compiled = await compiler("<div>{{name}}</div>", { name: "Jef" });

		expect(compiled).to.equal("<div>Jef</div>");
	});
});
