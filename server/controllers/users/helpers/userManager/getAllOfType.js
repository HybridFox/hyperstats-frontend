const UserModel = require("../../../../models/user");

const getQuery = (type, includeAdmin = false, status) => {
	const typeQuery = Array.isArray(type) ? { $in: type } : type;
	const statusQuery = status === "PENDING" ? status : { $in: [ "ACTIVATED", "DEACTIVATED" ] };
	const isAdmin = !!includeAdmin && includeAdmin !== "false";

	if (includeAdmin && status) {
		return {
			$or: [
				{ "data.company.meta.type": typeQuery },
				{ "meta.isAdmin": isAdmin },
				{ "meta.status.type": statusQuery },
			],
		};
	} else if (includeAdmin) {
		return {
			$or: [
				{ "data.company.meta.type": typeQuery },
				{ "meta.isAdmin": isAdmin },
			],
		};
	} else if (status) {
		return {
			$and: [
				{ $or: [
					{ "data.company.meta.type": typeQuery },
					{ "meta.status.type": statusQuery },
				] },
				{ "meta.isAdmin": isAdmin }],
		};
	} else {
		return {
			"data.company.meta.type": typeQuery,
			"meta.isAdmin": isAdmin,
			"meta.status.type": statusQuery,
		};
	}
};

module.exports = (type, includeAdmin, status) => {
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
		$match: getQuery(type, includeAdmin, status),
	}, {
		$project: {
			data: "$$ROOT.data",
			meta: "$$ROOT.meta",
		},
	}]).exec();
};
