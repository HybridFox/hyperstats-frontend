const { expect } = require("chai");
const { mockMongoose } = require("../../../test/mocks");
const createTestUser = require("../../../test/helpers/createTestUser");
const getCompanyIdOfUser  = require("./getCompanyIdOfUser");

describe.only("Company", () => {
	let mongoServer;
	let user;
	let loggedInReq;

	before(async() => {
		mongoServer = await mockMongoose();
		user = await createTestUser();
		loggedInReq = {
			session: {
				profile: user,
				safeProfile: user,
			},
		};
	});

	after(() => {
		mongoServer.stop();
	});

	describe("get by id of user", () => {
		it("Should get company id of user", () => {
			expect(getCompanyIdOfUser(loggedInReq)).to.equal("companyID");
		});

		// it("Should be undefined when no company is found", () => {
		// 	expect(getCompanyIdOfUser({ session: {} })).to.be.null;
		// });
	});
});
