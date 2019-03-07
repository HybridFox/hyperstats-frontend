const UserModel = require("../../../models/user");
const errors = require("../../../helpers/errorHandler");

/**
 * @function loginHandler Handles passport login
 * @param {String} username Username
 * @param {String} password Password
 * @returns {Promise} User
 */
module.exports = async(username, password) => {
	const user = await UserModel.findOne({ "data.username": username, "meta.validation.isValidated": true, "meta.deleted": false }).exec();

	if (!user) {
		throw errors.UserNotFound;
	}

	if (!await user.validatePassword(password)) {
		throw errors.InvalidPassword;
	}

	await user.populateCompany();

	return user.toObject();
};
