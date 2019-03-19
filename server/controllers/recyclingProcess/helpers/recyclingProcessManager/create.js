const RecyclingProcessModel = require("../../../../models/recyclingProcess");

module.exports = async({ process = {}, meta = {}, companyId }) => {
	const newProcess = new RecyclingProcessModel({
		data: process,
		meta: {
			...meta,
			createdByCompany: companyId,
		},
	});

	await newProcess.save();

	return newProcess.toObject();
};
