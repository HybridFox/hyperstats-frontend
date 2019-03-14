const path = require("path");
const uuid = require("node-uuid").v4;
const { path: rPath } = require("ramda");
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");
const errors = require("../../../helpers/errorHandler");

// Send confirm email
const registerMail = (user) => mailer({
	to: user.data.email,
	subject: "Rare - Confirm registration",
	templatePath: path.resolve(process.cwd(), "controllers/auth/templates/registerConfirm.html"),
	data: {
		firstname: user.data.firstname,
		confirmPath: `/api/auth/verify?token=${user.meta.validation.token}`,
	},
}).catch(async() => {
	await user.remove();

	throw errors.SendingEmailFailed;
});

const processUser = async(user) => {
	await Promise.all([
		registerMail(user),
		user.populateCompany(),
	]);

	return user.toObject();
};

/**
 * @function registerHandler Handles passport login
 * @param {Object} body User data
 * @returns {Promise} Saved user data
 */
module.exports = async(body) => {
	const user = await UserModel.findOne({ "data.username": body.username, "meta.deleted": false }).exec();

	if (rPath(["meta", "validation", "isValidated"], user)) {
		throw errors.EmailAlreadyTaken;
	} else if (rPath(["meta", "validation", "isValidated"], user) === false) { // When user is registered but not validated yet => sent new email
		return processUser(user);
	}

	const newUser = new UserModel({
		data: {
			...body,
			company: null,
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

	return processUser(newUser);
};
