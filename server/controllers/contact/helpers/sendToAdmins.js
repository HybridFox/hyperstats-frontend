const UserModel = require("../../../models/user");
const MailHelper = require("../../../helpers/mail");
const path = require("path");

module.exports = async(body) => {
	const admins = await UserModel.find({ "meta.isAdmin": true }, { "data.email": 1 }).lean().exec();
	const conversionMap = {
		"&": "&amp",
		"<": "&lt",
		">": "&gt",
		"\"": "&quot",
		"'": "&#39"
	};
	const message = body.body
		.replace(new RegExp(`(${Object.keys(conversionMap).join("|")})`, "g"), (match) => conversionMap[match])
		.replace(/(?:\r\n|\r|\n)/g, "<br>");

	return Promise.all(admins.map((admin) => MailHelper({
		to: admin.data.email,
		subject: "Rare | New contact message",
		templatePath: path.resolve(process.cwd(), "controllers/contact/templates/sendToAdmins.html"),
		data: {
			firstname: body.firstname,
			lastname: body.lastname,
			email: body.email,
			subject: body.subject,
			body: message,
		},
		replyTo: body.email,
	})));
};
