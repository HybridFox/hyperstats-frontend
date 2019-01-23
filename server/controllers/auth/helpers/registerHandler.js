const path = require("path");
const uuid = require("node-uuid").v4;
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");

/**
 * @function registerHandler Handles passport login
 * @param {Object} body User data
 * @returns {Promise} Saved user data
 */
module.exports = async(body) => {
	const user = await UserModel.findOne({ "data.email": body.email }).exec();

	if (user) {
		throw new Error({ type: 409, msg: "Email already taken" });
	}

	const newUser = new UserModel({
		data: body,
		meta: {
			validation: {
				isValidated: false,
				token: `${uuid()}-${uuid()}`,
			},
		},
	});

	newUser.data.password = await newUser.generateHash(body.password);

	await newUser.save();

	// Send confirm email
	await mailer({
		to: newUser.data.email,
		subject: "Rare - Confirm registration",
		templatePath: path.resolve(process.cwd(), "controllers/auth/templates/registerConfirm.html"),
		data: {
			firstname: newUser.data.firstname,
			confirmPath: `/api/auth/verify?token=${newUser.meta.validation.token}`,
		},
	}).catch(async(error) => {
		await newUser.remove();

		throw new Error({ type: 500, msg: "Sending mail failed", error });
	});

	return newUser.toObject();
};
