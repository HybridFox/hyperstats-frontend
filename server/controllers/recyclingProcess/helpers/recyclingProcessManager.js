const RecyclingProcessModel = require("../../../models/recyclingProcess");

module.exports = {
	getAll: () => {
		return RecyclingProcessModel.find({}).exec();
	}
}
