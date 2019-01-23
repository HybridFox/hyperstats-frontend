const UserModel = require("../../../models/user");

module.exports = async(password, token) => {
	const user = await UserModel.findOne({
		"meta.passwordReset.token": token,
		"meta.passwordReset.expireDate": { $gte: new Date() },
	}).exec();

	if (!user) {
		throw new Error({ type: 404, message: "User not found!" });
	}

	user.data.password = await user.generateHash(password);
	user.meta.passwordReset = null;

	await user.save();
};
