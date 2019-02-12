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
const UserModel = require("../models/user");

/**
 * @module ProfileHelper
 */

/**
 * @function get Get safe profile (no password an validated props)
 * @param {Object} req Express request object
 * @returns {Object} User Profile
 */
module.exports.get = (req) => path(["session", "safeProfile"])(req);

/**
 * @function get Get full profile
 * @param {Object} req Express request object
 * @returns {Object} Full ser Profile
 */
module.exports.getFull = (req) => path(["session", "profile"])(req);

/**
 * @function unset Unset profile props in session
 * @param {Object} req Express request object
 */
module.exports.unset = async (req) => {
	delete req.session.profile;
	delete req.session.safeProfile;

	await req.session.save();
};

/**
 * @function set Set user on session
 * @param {Object} req Express request object
 */
const set = module.exports.set = (req, user) => {
	req.session.profile = user;
	req.session.safeProfile = compose(
		when(isEmpty, always(null)),
		converge(
			merge,
			[
				compose(omit(["password"]), path(["session", "profile", "data"])),
				compose(omit(["validation", "passwordReset", "deleted"]), path(["session", "profile", "meta"])),
			]
		)
	)(req);

	req.session.save();
};

module.exports.reload = async(req) => {
	if (!path(["session", "profile", "_id"])(req)) {
		return;
	}

	const updatedUser = await UserModel.findOne({ _id: req.session.profile._id });

	await updatedUser.populateCompany();

	set(req, updatedUser.toObject());
};
