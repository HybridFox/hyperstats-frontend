

const UserModel = require("../../../../models/user");

module.exports = () => {
	return UserModel.find({ "meta.deleted": false, "meta.status.type": "PENDING" }).populate("data.company").lean().exec();
};
