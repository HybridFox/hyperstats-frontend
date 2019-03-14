const RecyclingProcessModel = require("../../../../models/recyclingProcess");

module.exports = ({ reportedById }) => {
	return RecyclingProcessModel.find({
		$and: [
			{ "meta.deleted": false },
			{ "meta.reportingCompany": reportedById },
		],
	}).exec();
};
