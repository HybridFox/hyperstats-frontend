const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const createCompany = require("./create");

should();
use(chaiAsPromised);

describe("Company", () => {
	describe("create", () => {
		let mongoServer;
		let companyOfUser;

		before(async() => {
			mongoServer = await mockMongoose();

			const user = await createTestUser();

			companyOfUser = user.meta.company;
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should create a company", async() => {
			const createdCompany = await createCompany({ type: "R", companyOfUser, company: {
				name: "Some Company",
				vat: "BE12 3456 7890",
				address: {
					street: "Some street",
					number: "33A",
					box: "Some box",
					zipCode: "Zip",
					city: "Antwerp",
					country: "Belgium",
				},
				contactPerson: {
					name: "John Smith",
					function: "Security",
					phone: "+32 ...",
					email: "john.smith@example.com",
				},
			} });

			expect(createdCompany).to.be.an("object");
			expect(createdCompany.data).to.be.an("object");
			expect(createdCompany.data.name).to.equal("Some Company");
			expect(createdCompany.data.address).to.be.an("object");
			expect(createdCompany.data.address).to.deep.equal({
				street: "Some street",
				number: "33A",
				box: "Some box",
				zipCode: "Zip",
				city: "Antwerp",
				country: "Belgium",
			});
			expect(createdCompany.data.contactPerson).to.be.an("object");
			expect(createdCompany.data.contactPerson).to.deep.equal({
				name: "John Smith",
				function: "Security",
				phone: "+32 ...",
				email: "john.smith@example.com",
			});
		});
	});
});

