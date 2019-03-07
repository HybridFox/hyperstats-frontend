const UserModel = require("../../../models/user");
const errors = require("../../../helpers/errorHandler");

/**
 * @function verifyHandler Get user based on verify token an make the user verified
 * @param {String} key Unique key to verify user email
 * @returns {Object} Returns user
 */
module.exports = async(token) => {
	const user = await UserModel.findOne({ "meta.deleted": false, "meta.validation": { isValidated: false, token } }).exec();

	if (!user) {
		throw errors.UserNotFound;
	}

	user.meta.validation.isValidated = true;

	await user.save();

	await user.populateCompany();

	return user.toObject();
};
