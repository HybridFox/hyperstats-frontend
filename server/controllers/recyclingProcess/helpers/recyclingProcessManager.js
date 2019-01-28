const RecyclingProcessModel = require("../../../models/recyclingProcess");
const Errors = require("../../../helpers/errorHandler");

module.exports = {
	create: (recyclingProcess) => {
		return RecyclingProcessModel.create(recyclingProcess);
	},
	getAll: () => {
		return RecyclingProcessModel.find({}).exec();
	},
	getById: (id) => {
		return RecyclingProcessModel.findOne({ _id: id }).exec()
			.then((data) => {
				if (!data) {
					throw Errors.ItemNotFound;
				}

				return data;
			});
	},
	remove: (id) => {
		return RecyclingProcessModel.findOneAndRemove({ _id: id }).exec()
			.then((response) => {
				if (!response) {
					throw Errors.ItemNotFound;
				}

				return response;
			});
	},
	update: (id, recyclingProcess) => {
		return RecyclingProcessModel.findOneAndUpdate(
			{ _id: id },
			{ ...recyclingProcess },
			{ new: true },
		).exec()
			.then((data) => {
				if (!data) {
					throw Errors.ItemNotFound;
				}

				return data;
			});
	},
};
