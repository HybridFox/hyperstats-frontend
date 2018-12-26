const UserModel = require("../../models/user");

/**
 * @function registerHandler Handles passport login
 * @param req Request object
 * @param email Email
 * @param password Password
 * @param callback Done callback
 */
module.exports = async (req, email, password, callback) => {
	try {
		const user = await UserModel.findOne({ "data.email": email }).exec();

		if (user) {
			return callback(null, false, "Email already taken");
		}

		const newUser = new UserModel({
			data: req.body
		});

		newUser.data.password = await newUser.generateHash(password);

		await newUser.save();

		req.session.profile = newUser.toObject();

		await promisify(req.session.save).bind(req.session)();

		return callback(null, req.session.profile);
	} catch (error) {
		return callback(error);
	}
}
