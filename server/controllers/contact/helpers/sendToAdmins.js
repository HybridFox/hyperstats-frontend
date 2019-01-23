const UserModel = require("../../../models/user");
const MailHelper = require("../../../helpers/mail");

module.exports = async({ email, subject, body }) => {
	const admins = await UserModel.find({ "meta.isAdmin": true }, { "data.email": 1 }).lean().exec();

	return Promise.all(admins.map((admin) => MailHelper({
		to: admin.data.email,
		subject,
		template: body,
		replyTo: email,
	})));
};
