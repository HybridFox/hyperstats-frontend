const UserModel = require("../../../../models/user");
const errors = require("../../../../helpers/errorHandler");

module.exports = async(id) => {
	const user = await UserModel.findOne({ _id: id, "meta.deleted": false }).populate("data.company").lean().exec();

	if (!user) {
		throw errors.ItemNotFound();
	}

	return user;
};
