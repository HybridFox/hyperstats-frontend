const RecyclingProcessModel = require("../../../../models/recyclingProcess");
const errors = require("../../../../helpers/errorHandler");

module.exports = ({ _id, createdByCompany }) => {
	return RecyclingProcessModel.findOne({ _id, "meta.deleted": false, "meta.createdByCompany": createdByCompany }).exec()
		.then((data) => {
			if (!data) {
				throw errors.ProcessNotFound;
			}

			return data;
		});
};
