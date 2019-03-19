const { set, lensPath, omit, compose } = require("ramda");
const RecyclingProcessModel = require("../../models/recyclingProcess");
const recyclingProcesses = require("../mocks/recyclingProcesses");

module.exports.create = async(companyOfUser, process = recyclingProcesses[0]) => {
	const item = new RecyclingProcessModel(compose(
		set(
			lensPath(["meta", "createdByCompany"]),
			companyOfUser
		),
		omit(["_id"])
	)(process));

	return item.save();
};
