const { v4: uuid } = require("node-uuid");
const { join } = require("path");
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");
const errors = require("../../../helpers/errorHandler");

const getFutureDate = (days) => {
	return new Date(new Date().getTime() + (86400000 * days));
};

module.exports = async(username) => {
	const resetToken = `${uuid()}-${uuid()}`;
	const user = await UserModel.findOneAndUpdate({
		"data.username": username,
		"meta.deleted": false,
		"meta.validation.isValidated": true,
	}, {
		"meta.passwordReset.token": resetToken,
		"meta.passwordReset.expireDate": getFutureDate(7),
	}, { new: true });

	if (!user) {
		throw errors.UserNotFound;
	}

	await mailer({
		to: user.data.email,
		subject: "Rare - Reset password",
		templatePath: join(process.cwd(), "controllers/auth/templates/passwordReset.html"),
		data: {
			firstname: user.data.firstname,
			confirmPath: `/auth/reset-password?token=${resetToken}`,
		},
	});

	return resetToken;
};
