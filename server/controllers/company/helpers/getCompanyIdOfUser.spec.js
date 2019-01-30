const { expect } = require("chai");
const getCompanyIdOfUser = require("./getCompanyIdOfUser");

const loggedInReq = {
	session: {
		safeProfile: {
			company: {
				_id: "companyID",
			},
		},
	},
};

describe("Company", () => {
	describe("get by id of user", () => {
		it("Should get company id of user", () => {
			expect(getCompanyIdOfUser(loggedInReq)).to.equal("companyID");
		});

		it("Should be undefined when no company is found", () => {
			expect(getCompanyIdOfUser({ session: {} })).to.be.null;
		});
	});
});
