const UserModel = require("../../../../models/user");
const errors = require("../../../../helpers/errorHandler");

module.exports = (id, status) => {
	return UserModel.findOneAndUpdate(
		{ _id: id, "meta.deleted": false },
		{ $set: { "meta.status": status } },
		{ new: true },
	).lean().exec()
		.then((data) => {
			if (!data) {
				throw errors.ItemNotFound;
			}

			return data;
		});
};
