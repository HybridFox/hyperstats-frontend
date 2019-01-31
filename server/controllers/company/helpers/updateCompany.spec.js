const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const updateCompany = require("./updateCompany");
const testCompany = require("../../../test/helpers/testCompany");
const companyMock = require("../../../test/mocks/company");
const ResponseError = require("../../../helpers/errors/responseError");
const { omit } = require("ramda");

should();
use(chaiAsPromised);

describe("Company", () => {
	describe("update", () => {
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

		it("Should update a company", async() => {
			const company = await updateCompany({
				_id: managedCompany.toObject()._id,
				companyOfUser,
				update: {
					name: "Some Company updated",
					address: {
						street: "Some street updated",
						number: "33A",
						box: "Some box updated",
						zipCode: "Zip updated",
						city: "Antwerp",
						country: "Belgium updated",
					},
					contactPerson: {
						name: "John Smith",
						function: "Security updated",
						phone: "+32 ... updated",
						email: "john.smith@example.com",
					},
				},
			});

			expect(company).to.be.an("object");
			expect(company.data).to.be.an("object");
			expect(company.toObject().data).to.deep.equal({
				name: "Some Company updated",
				address: {
					street: "Some street updated",
					number: "33A",
					box: "Some box updated",
					zipCode: "Zip updated",
					city: "Antwerp",
					country: "Belgium updated",
				},
				contactPerson: {
					name: "John Smith",
					function: "Security updated",
					phone: "+32 ... updated",
					email: "john.smith@example.com",
				},
			});
		});

		it("Should not update a componay because the user does not maintain it", async() => {
			expect(updateCompany({ _id: nonManagedCompany.toObject()._id, companyOfUser })).to.eventually.rejectedWith(ResponseError);
		});
	});
});

