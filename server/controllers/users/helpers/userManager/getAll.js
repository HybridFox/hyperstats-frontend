

const UserModel = require("../../../../models/user");

module.exports = (admin) => {
	const adminQuery = admin && admin.toLowerCase() !== "false" ? { "meta.isAdmin": true } : {};

	return UserModel.find({ "meta.deleted": false, ...adminQuery }).populate("data.company").lean().exec();
};
