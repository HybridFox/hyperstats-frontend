const UserModel = require("../../../models/user");
const { pick } = require("ramda");
const errors = require("../../../helpers/errorHandler");

module.exports = async(email, profile) => {
	const user = await UserModel.findOne({ "data.email": email });

	if (!user) {
		throw errors.UserNotFound;
	}

	user.data = {
		...user.data,
		...pick(["firstname", "lastname" ], profile),
	};
	user.meta.lastUpdated = new Date();

	await user.save();

	return user.toObject();
};
