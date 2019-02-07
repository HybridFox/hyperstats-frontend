
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Model = require("../../../../models/user");
const { mockMongoose } = require("../../../../test/mocks");
const Users = require("../../../../test/mocks/users");
// const Errors = require("../../../../helpers/errorHandler");

should();
use(chaiAsPromised);

describe("Update User Status", () => {
	let updateStatus;
	let mongoServer;
	let processId;

	before(async() => {
		mongoServer = await mockMongoose();
		updateStatus = require("./updateStatus");

		const result = await new Model(Users[0]).save();

		processId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get the user based on a correct _id", async() => {
		const result = await updateStatus(processId, "DEACTIVATED");

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.firstname).to.equal(Users[0].data.firstname);
		expect(result.data.lastname).to.equal(Users[0].data.lastname);
		expect(result.data.email).to.equal(Users[0].data.email);
		expect(result.meta.status).to.equal("DEACTIVATED");
	});

	// Todo: change Error string to new Error
	// it("Should throw error if user id doesn't exist,", async() => {
	// 	const result = await updateStatus("507f191e810c19729de860ea", "DEACTIVATED");

	// 	expect(result).to.throw(Errors.ItemNotFound);
	// });
});