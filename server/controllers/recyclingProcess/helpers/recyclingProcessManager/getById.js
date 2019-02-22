const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const Errors = require("../../../../helpers/errorHandler");

module.exports = (id) => {
	return RecyclingProcessModel.findOne({ _id: id, "meta.deleted": false }).exec()
		.then((data) => {
			if (!data) {
				throw Errors.ItemNotFound;
			}

			return data;
		});
};
