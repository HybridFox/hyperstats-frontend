const RecyclingProcessModel = require("../../../../models/recyclingProcess");

module.exports = ({ companyId }) => {
	return RecyclingProcessModel.find({
		$and: [
			{ "meta.deleted": false },
			{ "meta.createdByCompany": companyId },
		],
	}).exec();
};
