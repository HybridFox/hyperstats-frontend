const { v4: uuid } = require("node-uuid");
const { join } = require("path");
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");

const getFutureDate = (days) => {
	return new Date(new Date().getTime() + (86400000 * days));
};

module.exports = async(email) => {
	const resetToken = `${uuid()}-${uuid()}`;
	const user = await UserModel.findOneAndUpdate({
		"data.email": email,
		"meta.validation.isValidated": true,
	}, {
		"meta.passwordReset.token": resetToken,
		"meta.passwordReset.expireDate": getFutureDate(7),
	}, { new: true });

	if (!user) {
		throw new Error({ type: 404, message: "User not found" });
	}

	await mailer({
		to: email,
		subject: "Rare - Reset password",
		templatePath: join(process.cwd(), "controllers/auth/templates/passwordReset.html"),
		data: {
			firstname: user.data.firstname,
			confirmPath: `/reset-password?token=${resetToken}`,
		},
	});

	return resetToken;
};
