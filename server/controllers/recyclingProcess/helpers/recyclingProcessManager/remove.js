const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const Errors = require("../../../../helpers/errorHandler");

module.exports = (id) => {
	return RecyclingProcessModel.findOneAndUpdate({ _id: id, "meta.deleted": false }, { $set: { "meta.deleted": true } }).exec()
		.then((response) => {
			if (!response) {
				throw Errors.ItemNotFound;
			}

			return response;
		});
};
