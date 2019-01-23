const UserModel = require("../../models/user");
const CompanyModel = require("../../models/company");
const { compose, map, uniq, filter } = require("ramda");

module.exports = async(emails, removeLinkedCompanies = true) => {
	const users = await UserModel.find({ "data.email": { $in: emails } }, { _id: 1, "data.company": 1 }).lean().exec();

	if (removeLinkedCompanies) {
		const companies = compose(
			filter((comp) => !!comp),
			uniq,
			map((user) => user.data.company.toString())
		)(users);

		await CompanyModel.remove({ _id: { $in: companies } });
	}

	await UserModel.remove({ "data.email": { $in: emails } });
};
