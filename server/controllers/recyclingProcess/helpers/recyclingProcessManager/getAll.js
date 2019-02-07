const RecyclingProcessModel = require("../../../../models/recyclingProcess");

module.exports = () => {
	return RecyclingProcessModel.find({}).exec();
};
