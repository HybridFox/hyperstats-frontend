const {
	omit,
	path,
	compose,
	converge,
	merge,
	when,
	isEmpty,
	always,
} = require("ramda");

module.exports.get = (req) => req.session.safeProfile;

module.exports.getFull = (req) => req.session.profile;

module.exports.unset = (req) => {
	delete req.session.profile;
	delete req.session.safeProfile;
};

module.exports.set = (req, user) => {
	req.session.profile = user;
	req.session.safeProfile = compose(
		when(isEmpty, always(null)),
		converge(
			merge,
			[
				compose(omit(["password"]), path(["session", "profile", "data"])),
				compose(omit(["validated"]), path(["session", "profile", "meta"])),
			]
		)
	)(req);
};
