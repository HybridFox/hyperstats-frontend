

const UserModel = require("../../../../models/user");

module.exports = (id) => {
	return UserModel.findOne({ _id: id, "meta.deleted": false }).lean().exec();
};
