

const UserModel = require("../../../../models/user");

module.exports = (admin, status) => {
	const adminQuery = admin && admin.toLowerCase() !== "false" ? { "meta.isAdmin": true } : {};
	const statusQuery = status ? { "meta.status.type": status } : {};

	let matchQuery = null;

	if (admin && status) {
		matchQuery = { $or: [
			adminQuery,
			statusQuery,
		] };
	} else if (admin) {
		matchQuery = adminQuery;
	} else if (status) {
		matchQuery = statusQuery;
	}

	return UserModel.find({ "meta.deleted": false, ...matchQuery }).populate("data.company").lean().exec();
};
