

const UserModel = require("../../../../models/user");

const getQuery = (admin, status) => {
	const adminQuery = admin && admin.toLowerCase() !== "false" ? { "meta.isAdmin": true } : {};
	const statusQuery = status ? { "meta.status.type": status } : {};

	if (admin && status) {
		return {
			$or: [
				adminQuery,
				statusQuery,
			],
		};
	}

	if (admin) {
		return adminQuery;
	}

	if (status) {
		return statusQuery;
	}

	return {};
};

module.exports = (admin, status) => {
	return UserModel.find({ "meta.deleted": false, ...getQuery(admin, status) }).populate("data.company").lean().exec();
};
