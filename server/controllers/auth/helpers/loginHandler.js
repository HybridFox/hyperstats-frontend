const UserModel = require("../../../models/user");
const ResponseError = require("../../../helpers/errors/responseError");

/**
 * @function loginHandler Handles passport login
 * @param {String} username Username
 * @param {String} password Password
 * @returns {Promise} User
 */
module.exports = async(username, password) => {
	const user = await UserModel.findOne({ "data.username": username, "meta.deleted": false }).exec();

	if (!user) {
		throw new ResponseError({ type: 404, msg: "User not found" });
	}

	if (!await user.validatePassword(password)) {
		throw new ResponseError({ type: 400, msg: "Invalid password" });
	}

	await user.populateCompany();

	return user.toObject();
};
