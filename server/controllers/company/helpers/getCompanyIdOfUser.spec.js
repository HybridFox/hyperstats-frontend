const { expect } = require("chai");
const profileStub = {};
const proxyquire = require("proxyquire").noPreserveCache();

const loggedInReq = {
	company: {
		_id: "companyID",
	},
};

describe("Company", () => {
	let getCompanyIdOfUser;

	before(() => {
		getCompanyIdOfUser = proxyquire("./getCompanyIdOfUser", {
			"../../../helpers/profile": profileStub,
		});

		profileStub.get = (req) => req;
	});

	describe("get by id of user", () => {
		it("Should get company id of user", () => {
			expect(getCompanyIdOfUser(loggedInReq)).to.eventually.equal("companyID");
		});

		it("Should be undefined when no company is found", () => {
			expect(getCompanyIdOfUser({ session: {} })).to.eventually.be.null;
		});
	});
});
