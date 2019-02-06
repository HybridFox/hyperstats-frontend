const path = require("path");
const uuid = require("node-uuid").v4;
const { path: rPath } = require("ramda");
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");
const ResponseError = require("../../../helpers/errors/responseError");

// Send confirm email
const registerMail = (user) => mailer({
	to: user.data.email,
	subject: "Rare - Confirm registration",
	templatePath: path.resolve(process.cwd(), "controllers/auth/templates/registerConfirm.html"),
	data: {
		firstname: user.data.firstname,
		confirmPath: `/api/auth/verify?token=${user.meta.validation.token}`,
	},
}).catch(async(error) => {
	await user.remove();

	throw new ResponseError({ type: 500, msg: "Sending mail failed", error });
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
	const user = await UserModel.findOne({ "data.email": body.email }).exec();

	if (rPath(["meta", "validation", "isValidated"], user)) {
		throw new ResponseError({ type: 409, msg: "Email already taken" });
	} else if (rPath(["meta", "validation", "isValidated"], user) === false) { // When user is registered but not validated yet => sent new email
		return processUser(user);
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

	return processUser(newUser);
};
