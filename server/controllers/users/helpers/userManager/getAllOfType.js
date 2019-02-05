

const UserModel = require("../../../../models/user");

module.exports = (type) => {
	console.log(type);

	return UserModel.aggregate([{
		$lookup: {
			from: "companies",
			localField: "data.company",
			foreignField: "_id",
			as: "data.company",
		},
	},
	{
		$project: {
			data: "$$ROOT.data",
			meta: "$$ROOT.meta",
			_company: { $arrayElemAt: ["$data.company", 0] },
		},
	}, {
		$match: {
			"_company.meta.type": type,
		},
	}, {
		$project: {
			data: "$$ROOT.data",
			meta: "$$ROOT.meta",
		},
	}]).exec();
};
