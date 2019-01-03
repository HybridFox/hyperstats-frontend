const UserModel = require("../../../models/user");

/**
 * @function registerHandler Handles passport login
 * @param {Object} body User data
 * @returns {Promise} Saved user data
 */
module.exports = async(body) => {
	const user = await UserModel.findOne({ "data.email": body.email }).exec();

	if (user) {
		throw new Error({ type: 409, msg: "Email already taken" });
	}

	const newUser = new UserModel({
		data: body,
		meta: {
			validated: false,
		},
	});

	newUser.data.password = await newUser.generateHash(body.password);

	await newUser.save();

	// TODO: Send email

	return newUser.toObject();
};
