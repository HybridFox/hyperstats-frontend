const UserModel = require("../../../models/user");
const errors = require("../../../helpers/errorHandler");

/**
 * @function loginHandler Handles passport login
 * @param {String} username Username
 * @param {String} password Password
 * @returns {Promise} User
 */
module.exports = async(username, password) => {
	const user = await UserModel.findOne({ "data.username": username }).exec();

	if (!user) {
		throw errors.UserNotFound;
	}

	if (user.meta.deleted) {
		throw errors.MissingAuthorization;
	}

	if (!await user.validatePassword(password)) {
		throw errors.InvalidPassword;
	}

	await user.populateCompany();

	return user.toObject();
};
