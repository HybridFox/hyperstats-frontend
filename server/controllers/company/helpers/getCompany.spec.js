const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const getCompany = require("./getCompany");
const testCompany = require("../../../test/helpers/testCompany");
const companyMock = require("../../../test/mocks/company");
const ResponseError = require("../../../helpers/errors/responseError");
const { omit } = require("ramda");

should();
use(chaiAsPromised);

describe("Company", () => {
	describe("get", () => {
		let mongoServer;
		let companyOfUser;
		let managedCompany;
		let nonManagedCompany;

		before(async() => {
			mongoServer = await mockMongoose();

			const user = await createTestUser();

			companyOfUser = user.data.company;

			managedCompany = await testCompany.create(omit(["_id"])(companyMock), companyOfUser);
			nonManagedCompany = await testCompany.create(omit(["_id"])(companyMock));
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get company by id", async() => {
			const company = await getCompany({ _id: managedCompany.toObject()._id, companyOfUser });

			expect(company).to.be.an("object");
			expect(company.data).to.be.an("object");
			expect(company.data.name).to.equal("Some company");
		});

		it("Should not get a componay because the user does not maintain it", async() => {
			expect(getCompany({ _id: nonManagedCompany.toObject()._id, companyOfUser })).to.eventually.rejectedWith(ResponseError);
		});
	});
});

