const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const errors = require("../../../../helpers/errorHandler");

module.exports = (id) => {
	return RecyclingProcessModel.findOneAndUpdate({ _id: id, "meta.deleted": false }, { $set: { "meta.deleted": true } }).exec()
		.then((response) => {
			if (!response) {
				throw errors.ProcessNotFound;
			}

			return response;
		});
};
