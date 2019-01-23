const UserModel = require("../../../models/user");
const ResponseError = require("../../../helpers/errors/responseError");

/**
 * @function loginHandler Handles passport login
 * @param {String} email Email
 * @param {String} password Password
 * @returns {Promise} User
 */
module.exports = async(email, password) => {
	const user = await UserModel.findOne({ "data.email": email, "meta.validation.isValidated": true }).exec();

	if (!user) {
		throw new ResponseError({ type: 404, msg: "User not found" });
	}

	if (!await user.validatePassword(password)) {
		throw new ResponseError({ type: 400, msg: "Invalid password" });
	}

	return user.toObject();
};
