const UserModel = require("../../../models/user");
const MailHelper = require("../../../helpers/mail");
const textToHTml = require("../../../helpers/textToHtml");
const path = require("path");

module.exports = async(body) => {
	const admins = await UserModel.find({ "meta.isAdmin": true }, { "data.email": 1 }).lean().exec();

	return Promise.all(admins.map((admin) => MailHelper({
		to: admin.data.email,
		subject: "Rare | New contact message",
		templatePath: path.resolve(process.cwd(), "controllers/contact/templates/sendToAdmins.html"),
		data: {
			firstname: body.firstname,
			lastname: body.lastname,
			email: body.email,
			subject: body.subject,
			body: textToHTml(body.body),
		},
		replyTo: body.email,
	})));
};
