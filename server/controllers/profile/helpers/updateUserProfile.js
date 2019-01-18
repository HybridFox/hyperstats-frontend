const UserModel = require("../../../models/user");
const { pick } = require("ramda");

module.exports = async(email, profile) => {
	const user = await UserModel.findOne({ "data.email": email });

	if (!user) {
		throw new Error({ type: 404, msg: "User not found" });
	}

	user.data = {
		...user.data,
		...pick(["firstname", "lastname" ], profile),
	};
	user.meta.lastUpdated = new Date();

	await user.save();

	return user.toObject();
};
