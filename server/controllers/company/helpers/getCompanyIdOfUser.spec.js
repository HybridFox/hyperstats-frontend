const { expect } = require("chai");
const mockery = require("mockery");
const getCompanyIdOfUser = require("./getCompanyIdOfUser");
const proxyquire = require("proxyquire").noCallThru();
const profileStub = {};

const loggedInReq = {
	session: {
		profile: {
			_id: "someID",
		},
		safeProfile: {
			company: {
				_id: "companyID",
			},
		},
	},
};

const getCompany = proxyquire("./getCompanyIdOfUser.js", {
	"../../../helpers/profile": profileStub,
});

profileStub.reload = () => console.log("mock called");

describe.only("Company", () => {
	// let getCompanyIdOfUser;

	// before(async() => {
	// 	const UserModel = {
	// 		findOne: () => loggedInReq,
	// 	};

	// 	mockery.enable({ warnOnUnregistered: false, useCleanCache: true });
	// 	mockery.registerMock("../../../helpers/profile", UserModel);
	// 	getCompanyIdOfUser  = require("./getCompanyIdOfUser");
	// });

	// after(() => {
	// 	mockery.deregisterAll();
	// 	mockery.disable();
	// });

	describe("get by id of user", () => {
		it("Should get company id of user", () => {
			expect(getCompanyIdOfUser(loggedInReq)).to.equal("companyID");
		});

		it("Should be undefined when no company is found", () => {
			expect(getCompanyIdOfUser({ session: {} })).to.be.null;
		});
	});
});
