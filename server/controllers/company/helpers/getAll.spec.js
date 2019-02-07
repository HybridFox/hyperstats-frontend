const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const getCompanies = require("./getAll");
const testCompany = require("../../../test/helpers/testCompany");
const companyMock = require("../../../test/mocks/company");
const { omit } = require("ramda");

should();
use(chaiAsPromised);

describe("Company", () => {
	describe("getAll", () => {
		let mongoServer;
		let companyOfUser;

		before(async() => {
			mongoServer = await mockMongoose();

			const user = await createTestUser();

			companyOfUser = user.data.company;

			await testCompany.create(omit(["_id"])(companyMock), companyOfUser);
			await testCompany.create(omit(["_id"])(companyMock), companyOfUser);
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get companies managed by the user", async() => {
			const companies = await getCompanies({ type: "R", companyOfUser });

			expect(companies).to.have.lengthOf(3);
			expect(companies[0]).to.be.an("object");
			expect(companies[0].data).to.be.an("object");
			expect(companies[0].data.name).to.equal("Company for user");
		});

		it("Should get no complience organization companies because the user does not maintain any", async() => {
			const companies = await getCompanies({ type: "CO", companyOfUser });

			expect(companies).to.have.lengthOf(0);
		});
	});
});
