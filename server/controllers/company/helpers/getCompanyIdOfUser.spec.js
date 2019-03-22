const { expect } = require("chai");
const getCompanyIdOfUser = require("./getCompanyIdOfUser");
const proxyquire = require("proxyquire");
const UserModel = {};
const mockery = require("mockery");
const { path } = require("ramda");

const loggedInReq = {
	session: {
		safeProfile: {
			company: {
				_id: "companyID",
			},
		},
	},
};

describe.only("Company", () => {
	before(async() => {
		const profileMock = {
			reload: function() {
				console.log("hello from mockend function");
			},
		};

		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock("../../../helpers/profile", profileMock);
	});

	after(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe("get by id of user", () => {
		it("Should get company id of user", () => {
			expect(getCompanyIdOfUser(loggedInReq)).to.equal("companyID");
		});

		it("Should be undefined when no company is found", () => {
			expect(getCompanyIdOfUser({ session: {} })).to.be.null;
		});
	});
});
