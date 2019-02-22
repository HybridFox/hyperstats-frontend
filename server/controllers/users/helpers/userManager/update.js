const UserModel = require("../../../../models/user");
const Errors = require("../../../../helpers/errorHandler");

module.exports = async(id, data) => {
	const user = await UserModel.findOne({ _id: id, "meta.deleted": false }).exec();
	const originalUserObject = user.toObject();

	if (!user) {
		throw Errors.ItemNotFound;
	}

	user.data = {
		...originalUserObject.data,
		...data.data,
	};
	user.meta = {
		...originalUserObject.meta,
		...data.meta,
	};


	await user.save();

	return user.toObject();
};
