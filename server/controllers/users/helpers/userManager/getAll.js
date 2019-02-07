

const UserModel = require("../../../../models/user");

module.exports = () => {
	return UserModel.find({}).lean().exec();
};
