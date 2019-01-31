const RecyclingProcessModel = require("../../../../models/recyclingProcess");

module.exports = (recyclingProcess) => {
	return RecyclingProcessModel.create(recyclingProcess);
};
