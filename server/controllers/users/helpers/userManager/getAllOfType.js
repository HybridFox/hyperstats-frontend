

const UserModel = require("../../../../models/user");

module.exports = (type, includeAdmin = false) => {
	const typeQuery = Array.isArray(type) ? { $in: type } : type;
	const isAdmin = !!includeAdmin && includeAdmin !== "false";
	const matchQuery = includeAdmin ? {
		$or: [
			{ "data.company.meta.type": typeQuery },
			{ "meta.isAdmin": isAdmin },
		],
	} : {
		"data.company.meta.type": typeQuery,
		"meta.isAdmin": isAdmin,
	};

	return UserModel.aggregate([{
		$match: {
			"meta.deleted": false,
		},
	}, {
		$lookup: {
			from: "companies",
			localField: "data.company",
			foreignField: "_id",
			as: "data.company",
		},
	}, {
		$project: {
			data: {
				firstname: "$$ROOT.data.firstname",
				lastname: "$$ROOT.data.lastname",
				email: "$$ROOT.data.email",
				company: { $arrayElemAt: ["$data.company", 0] },
			},
			meta: "$$ROOT.meta",
		},
	}, {
		$match: matchQuery,
	}, {
		$project: {
			data: "$$ROOT.data",
			meta: "$$ROOT.meta",
		},
	}]).exec();
};
