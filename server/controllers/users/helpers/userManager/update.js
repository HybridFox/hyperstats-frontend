const UserModel = require("../../../../models/user");
const Errors = require("../../../../helpers/errorHandler");

module.exports = (id, data) => {
	return UserModel.findOneAndUpdate(
		{ _id: id, "meta.deleted": false },
		{ ...data },
		{ new: true },
	).lean().exec()
		.then((response) => {
			if (!response) {
				throw Errors.ItemNotFound;
			}

			return response;
		});
};
