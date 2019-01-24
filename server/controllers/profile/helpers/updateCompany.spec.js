
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const CompanyModel = require("../../../models/company");
const company = require("../../../test/mocks/company");

should();
use(chaiAsPromised);

describe("UpdateCompany", () => {
	let updateCompany;
	let mongoServer;
	let companyId;

	before(async() => {
		mongoServer = await mockMongoose();
		updateCompany = require("./updateCompany");

		const result = await new CompanyModel(company).save();

		companyId = result.toObject()._id;
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should update the company based on a correct _id", async() => {
		const result = await updateCompany(companyId, {
			...company.data,
			name: "updated name",
			address: {
				...company.data.address,
				street: "updated street",
			},
		});

		expect(result).to.be.an("object");
		expect(result.data).to.be.an("object");
		expect(result.meta).to.be.an("object");
		expect(result.data.name).to.equal("updated name");
		expect(result.data.address).to.be.an("object");
		expect(result.data.address.street).to.equal("updated street");
		expect(result.data.address.number).to.equal(company.data.address.number);
	});
});
