const UserModel = require("../../../../models/user");
const Errors = require("../../../../helpers/errorHandler");

module.exports = async(id) => {
	const user = await UserModel.findOne({ _id: id, "meta.deleted": false }).lean().exec();

	if (!user) {
		throw Errors.ItemNotFound();
	}

	return user;
};
