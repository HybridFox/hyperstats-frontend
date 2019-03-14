const RecyclingProcessModel = require("../../../../models/recyclingProcess");

module.exports = ({ process = {}, meta = {}, companyId }) => {
	return RecyclingProcessModel.create({
		data: process,
		meta: {
			...meta,
			reportingCompany: companyId,
		},
	});
};
