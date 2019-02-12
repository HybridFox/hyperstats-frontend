

const UserModel = require("../../../../models/user");

module.exports = () => {
	return UserModel.find({ "meta.deleted": false }).lean().exec();
};
