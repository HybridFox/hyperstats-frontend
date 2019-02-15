const { v4: uuid } = require("node-uuid");
const { join } = require("path");
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");
const ResponseError = require("../../../helpers/errors/responseError");

const getFutureDate = (days) => {
	return new Date(new Date().getTime() + (86400000 * days));
};

module.exports = async(email) => {
	const resetToken = `${uuid()}-${uuid()}`;
	const user = await UserModel.findOneAndUpdate({
		"data.email": email,
		"meta.deleted": false,
		"meta.validation.isValidated": true,
	}, {
		"meta.passwordReset.token": resetToken,
		"meta.passwordReset.expireDate": getFutureDate(7),
	}, { new: true });

	if (!user) {
		throw new ResponseError({ type: 404, msg: "User not found" });
	}

	await mailer({
		to: email,
		subject: "Rare - Reset password",
		templatePath: join(process.cwd(), "controllers/auth/templates/passwordReset.html"),
		data: {
			firstname: user.data.firstname,
			confirmPath: `/auth/reset-password?token=${resetToken}`,
		},
	});

	return resetToken;
};
