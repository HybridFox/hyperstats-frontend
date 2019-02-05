const RPModel = require("../../../../models/recyclingProcess");
const errors = require("../../../../helpers/errorHandler");

module.exports = async(_id, bool) => {
	const updateResult = await RPModel.update({ _id }, { $set: { "meta.activated": bool } }).exec();

	if (updateResult.nModified === 0) {
		throw errors.ItemNotFound;
	}

	return;
};
