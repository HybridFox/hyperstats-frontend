const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const Errors = require("../../../../helpers/errorHandler");

module.exports = (id, recyclingProcess) => {
	return RecyclingProcessModel.findOneAndUpdate(
		{ _id: id },
		{ ...recyclingProcess },
		{ new: true },
	).exec()
		.then((data) => {
			if (!data) {
				throw Errors.ItemNotFound;
			}

			return data;
		});
};
