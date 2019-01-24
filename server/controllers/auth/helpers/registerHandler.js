const path = require("path");
const uuid = require("node-uuid").v4;
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");
const ResponseError = require("../../../helpers/errors/responseError");

/**
 * @function registerHandler Handles passport login
 * @param {Object} body User data
 * @returns {Promise} Saved user data
 */
module.exports = async(body) => {
	const user = await UserModel.findOne({ "data.email": body.email }).exec();

	if (user) {
		throw new ResponseError({ type: 409, msg: "Email already taken" });
	}

	const newUser = new UserModel({
		data: {
			...body,
			company: "5c485d0029abc50032947f91",
		},
		meta: {
			validation: {
				isValidated: false,
				companyName: body.companyName,
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

		throw new ResponseError({ type: 500, msg: "Sending mail failed", error });
	});

	return newUser.toObject();
};
