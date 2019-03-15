const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const removeCompany = require("./remove");
const testCompany = require("../../../test/helpers/testCompany");
const companyMock = require("../../../test/mocks/company");
const errors = require("../../../helpers/errorHandler");
const CompanyModel = require("../../../models/company");
const { omit } = require("ramda");

should();
use(chaiAsPromised);
describe("Company", () => {
	describe("remove", () => {
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

		it("Should remove a company", async() => {
			await removeCompany({ _id: managedCompany.toObject()._id, companyOfUser });
			const company = await CompanyModel.findOne({ _id: managedCompany.toObject()._id });

			expect(company).to.be.an("object");
			expect(company.meta).to.be.an("object");
			expect(company.meta.deleted).to.be.true;
		});

		it("Should not remove a company that the user has no access to", async() => {
			expect(removeCompany({ _id: nonManagedCompany.toObject()._id, companyOfUser })).to.eventually.rejectedWith(errors.CompanyNotFound);
		});
	});
});

