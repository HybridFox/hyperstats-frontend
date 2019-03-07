

const UserModel = require("../../../../models/user");

module.exports = () => {
	return UserModel.find({ "meta.deleted": false, "meta.status.type": "PENDING", "meta.validation.isValidated": true }).populate("data.company").lean().exec();
};
