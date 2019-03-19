const UserModel = require("../../../models/user");
const errors = require("../../../helpers/errorHandler");

module.exports = async(password, token) => {
	const user = await UserModel.findOne({
		"meta.passwordReset.token": token,
		"meta.deleted": false,
		"meta.passwordReset.expireDate": { $gte: new Date() },
	}).exec();

	if (!user) {
		throw errors.UserNotFound;
	}

	user.data.password = await user.generateHash(password);
	user.meta.passwordReset = {};

	await user.save();
};
