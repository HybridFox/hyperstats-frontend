
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/user");
const { mockMongoose } = require("../../../../test/mocks");
const Users = require("../../../../test/mocks/users");

should();
use(chaiAsPromised);

describe("Update User", () => {
	let update;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		update = require("./update");

		const result = await new Model(Users[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should update the user based on a correct _id", async() => {
		const result = await update(processId, {
			data: {
				firstname: "Joske",
				lastname: "Janssens",
				email: "joske@janssens.be",
			},
		});

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.firstname).to.equal("Joske");
		expect(result.data.lastname).to.equal("Janssens");
		expect(result.data.email).to.equal("joske@janssens.be");
	});
});
