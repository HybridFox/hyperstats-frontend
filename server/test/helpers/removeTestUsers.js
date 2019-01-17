const UserModel = require("../../models/user");

module.exports = (emails) => Promise.all(emails.map((email) => {
	return UserModel.remove({ "data.email": email }).exec();
}));
