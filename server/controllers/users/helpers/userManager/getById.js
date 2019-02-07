

const UserModel = require("../../../../models/user");

module.exports = (id) => {
	return UserModel.findOne({ _id: id }).lean().exec();
};
