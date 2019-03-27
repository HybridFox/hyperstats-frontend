const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const createPopulatedUser = require("../../../test/helpers/createPopulatedUser");
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

			const user = await createPopulatedUser();

			companyOfUser = user.data.company;

			await testCompany.create(omit(["_id"])(companyMock), companyOfUser._id);
			await testCompany.create(omit(["_id"])(companyMock), companyOfUser._id);
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should get companies managed by the user", async() => {
			const companies = await getCompanies({ type: "R", companyOfUser });

			expect(companies).to.have.lengthOf(0);
		});

		it("Should get no complience organization companies because the user does not maintain any", async() => {
			const companies = await getCompanies({ type: "CO", companyOfUser });

			expect(companies).to.have.lengthOf(0);
		});
	});
});
