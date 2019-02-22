const RPModel = require("../../../../models/recyclingProcess");
const errors = require("../../../../helpers/errorHandler");

module.exports = async(_id, bool) => {
	const process = await RPModel.findOneAndUpdate({ _id, "meta.deleted": false }, { $set: { "meta.activated": bool } }, { new: true }).exec();

	if (!process) {
		throw errors.ItemNotFound;
	}

	return process.toObject();
};
