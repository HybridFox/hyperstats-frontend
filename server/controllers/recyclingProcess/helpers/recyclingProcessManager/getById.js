const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const errors = require("../../../../helpers/errorHandler");

module.exports = (id) => {
	return RecyclingProcessModel.findOne({ _id: id, "meta.deleted": false }).exec()
		.then((data) => {
			if (!data) {
				throw errors.ProcessNotFound;
			}

			return data;
		});
};
