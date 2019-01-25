const { expect } = require("chai");
const profile = require("./profile");

const setupReqObject = () => {
	return {
		session: {
			save: () => {},
		},
	};
};

describe("profile", () => {
	const user = {
		data: {
			firstname: "fname",
			password: "some secret",
		},
		meta: {
			validation: {
				isValidated: false,
				token: "someToken",
			},
			passwordReset: {
				token: "some token",
			},
		},
	};
	let req;

	beforeEach(() => req = setupReqObject());

	afterEach(() => req = null);

	it("Should get falsy value when requesting profile", () => {
		const result = profile.get(req);

		expect(result).to.be.undefined;
	});

	it("Should get falsy value when requesting full profile", () => {
		const result = profile.getFull(req);

		expect(result).to.be.undefined;
	});

	it("Should set a profile", () => {
		profile.set(req, user);

		expect(req.session.profile).to.deep.equal(user);
		expect(req.session.safeProfile).to.deep.equal({
			firstname: "fname",
		});
	});

	it("Should get a safe profile", () => {
		profile.set(req, user);
		const result = profile.get(req);

		expect(result).to.deep.equal({
			firstname: "fname",
		});
	});

	it("Should get a full profile", () => {
		profile.set(req, user);
		const result = profile.getFull(req);

		expect(result).to.deep.equal(user);
	});

	it("Should unset profile", () => {
		profile.set(req, user);

		expect(req.session.profile).to.deep.equal(user);
		expect(req.session.safeProfile).to.deep.equal({ firstname: "fname" });

		profile.unset(req);

		expect(req.session.profile).to.be.undefined;
		expect(req.session.safeProfile).to.be.undefined;
	});
});
