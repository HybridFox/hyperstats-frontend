
const { expect, use, should } = require("chai");
const { set, dissoc, lensPath } = require("ramda");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../../test/mocks");
const createTestUser = require("../../../../test/helpers/createTestUser");
const testCompany = require("../../../../test/helpers/testCompany");
const companyMock = require("../../../../test/mocks/company");

should();
use(chaiAsPromised);

describe("Get Users", () => {
	let getAllOfType;
	let mongoServer;
	let recyclingPartner;
	let complianceOrg;

	before(async() => {
		mongoServer = await mockMongoose();
		getAllOfType = require("./getAllOfType");

		const baseCompany = dissoc("_id", companyMock);

		recyclingPartner = await testCompany.create(set(lensPath(["meta", "type"]), "RP")(baseCompany));
		complianceOrg = await testCompany.create(set(lensPath(["meta", "type"]), "CO")(baseCompany));

		await Promise.all([
			createTestUser(),
			createTestUser({ company: recyclingPartner._id, email: "recycling@example.com" }),
			createTestUser({ company: complianceOrg._id, email: "compliance_org@example.com" }),
		]);
	});

	after(() => {
		mongoServer.stop();
	});

	it("Should get all users of type recycler", async() => {
		const result = await getAllOfType("R");

		expect(result).to.be.an("array").to.have.lengthOf(1);
		expect(result[0]).to.be.an("object");
		expect(result[0].data).to.be.an("object");
		expect(result[0].meta).to.be.an("object");
		expect(result[0].data.firstname).to.equal("__firstname_test-user__remove_identifier__");
		expect(result[0].data.lastname).to.equal("Smith");
		expect(result[0].data.email).to.equal("validuser@example.com");
	});

	it("Should get all users of type recyclingPartner", async() => {
		const result = await getAllOfType("RP");

		expect(result).to.be.an("array").to.have.lengthOf(1);
		expect(result[0]).to.be.an("object");
		expect(result[0].data).to.be.an("object");
		expect(result[0].meta).to.be.an("object");
		expect(result[0].data.firstname).to.equal("__firstname_test-user__remove_identifier__");
		expect(result[0].data.lastname).to.equal("Smith");
		expect(result[0].data.email).to.equal("recycling@example.com");
	});

	it("Should get all users of type compliance org", async() => {
		const result = await getAllOfType("CO");

		expect(result).to.be.an("array").to.have.lengthOf(1);
		expect(result[0]).to.be.an("object");
		expect(result[0].data).to.be.an("object");
		expect(result[0].meta).to.be.an("object");
		expect(result[0].data.firstname).to.equal("__firstname_test-user__remove_identifier__");
		expect(result[0].data.lastname).to.equal("Smith");
		expect(result[0].data.email).to.equal("compliance_org@example.com");
	});
});
