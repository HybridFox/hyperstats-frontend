const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const Errors = require("../../../../helpers/errorHandler");

module.exports = (id) => {
	return RecyclingProcessModel.findOneAndRemove({ _id: id }).exec()
		.then((response) => {
			if (!response) {
				throw Errors.ItemNotFound;
			}

			return response;
		});
};
