const { Types } = require("mongoose");
const { expect, use, should } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { mockMongoose } = require("../../../test/mocks");
const setActiveProp = require("./setActiveProp");
const testCompany = require("../../../test/helpers/testCompany");
const CompanyModel = require("../../../models/company");
const errors = require("../../../helpers/errorHandler");

should();
use(chaiAsPromised);

describe("Company", () => {
	describe("setActiveProp", () => {
		let mongoServer;
		let company;

		before(async() => {
			mongoServer = await mockMongoose();

			company = await testCompany.create();
		});

		after(() => {
			mongoServer.stop();
		});

		it("Should activate a company", async() => {
			const result = await setActiveProp(company._id, true);

			const dbResult = await CompanyModel.findOne({ _id: company._id }).lean().exec();

			expect(result).to.be.an("object");
			expect(result.meta).to.be.an("object");
			expect(result.meta.activated).to.be.true;
			expect(dbResult).to.be.an("object");
			expect(dbResult.meta).to.be.an("object");
			expect(dbResult.meta.activated).to.be.true;
		});

		it("Should deactivate a company", async() => {
			const result = await setActiveProp(company._id, false);
			const dbResult = await CompanyModel.findOne({ _id: company._id }).lean().exec();

			expect(result).to.be.an("object");
			expect(result.meta).to.be.an("object");
			expect(result.meta.activated).to.be.false;
			expect(dbResult).to.be.an("object");
			expect(dbResult.meta).to.be.an("object");
			expect(dbResult.meta.activated).to.be.false;
		});


		it("Should throw error when company doesn't exist", async() => {
			expect(setActiveProp(Types.ObjectId(), true)).to.eventually.rejectedWith(errors.ItemNotFound);
		});
	});
});

