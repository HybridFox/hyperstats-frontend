const { promisify } = require("util");
const UserModel = require("../../models/user");

/**
 * @function loginHandler Handles passport login
 * @param req Request object
 * @param email Email
 * @param password Password
 * @param callback Done callback
 */
module.exports = async (req, email, password, callback) => {
	try {
		const user = await UserModel.findOne({ "data.email": email }).exec();

		if (!user) {
			return callback(null, false, "User not found");
		}

		if (!await user.validatePassword(password)) {
			return callback(null, false, "Invalid password");
		}

		req.session.profile = user.toObject();

		await promisify(req.session.save).bind(req.session)();

		return callback(null, req.session.profile);
	} catch(error) {
		return callback(error);
	}
}
