const UserModel = require("../../../models/user");

/**
 * @function verifyHandler Get user based on verify token an make the user verified
 * @param {String} key Unique key to verify user email
 * @returns {Object} Returns user
 */
module.exports = async(token) => {
	const user = await UserModel.findOne({ "meta.validation": { isValidated: false, token } }).exec();

	if (!user) {
		throw new Error({ type: 400, msg: "Invalid token!" });
	}

	user.meta.validation.isValidated = true;

	await user.save();

	return user.toObject();
};
