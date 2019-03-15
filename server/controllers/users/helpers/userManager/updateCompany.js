const UserModel = require("../../../../models/user");
const errors = require("../../../../helpers/errorHandler");

module.exports = (id, company) => {
	return UserModel.findOneAndUpdate(
		{ _id: id, "meta.deleted": false },
		{ $set: { "data.company": company } },
		{ new: true },
	).lean().exec()
		.then((data) => {
			if (!data) {
				throw errors.ItemNotFound;
			}

			return data;
		});
};
