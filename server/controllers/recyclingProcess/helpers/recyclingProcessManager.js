const RecyclingProcessModel = require("../../../models/recyclingProcess");

module.exports = {
	create: (recyclingProcess) => {
		return RecyclingProcessModel.create(recyclingProcess);
	},
	getAll: () => {
		return RecyclingProcessModel.find({}).exec();
	},
	getById: (id) => {
		return RecyclingProcessModel.findOne({ _id: id }).exec();
	},
	update: (recyclingProcess) => {
		return RecyclingProcessModel.update(
			{ _id: recyclingProcess._id },
			{
				$set: {
					...recyclingProcess,
				},
			}
		).exec();
	},
};
