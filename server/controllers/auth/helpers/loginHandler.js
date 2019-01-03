const UserModel = require("../../../models/user");

/**
 * @function loginHandler Handles passport login
 * @param {String} email Email
 * @param {String} password Password
 * @returns {Promise} User
 */
module.exports = async(email, password) => {
	const user = await UserModel.findOne({ "data.email": email }).exec();

	if (!user) {
		throw new Error({ type: 404, msg: "User not found" });
	}

	if (!await user.validatePassword(password)) {
		throw new Error({ type: 400, msg: "Invalid password" });
	}

	return user.toObject();
};
