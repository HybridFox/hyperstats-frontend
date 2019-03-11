const path = require("path");
const UserModel = require("../../../models/user");
const mailer = require("../../../helpers/mail");
const ResponseError = require("../../../helpers/errors/responseError");

const mailToAdmins = (user, admins) => mailer({
	to: admins,
	subject: "Rare - New Signup Request",
	templatePath: path.resolve(process.cwd(), "controllers/auth/templates/signupRequest.html"),
	data: {
		userFirstName: user.data.firstname,
		userLastName: user.data.lastname,
		confirmPath: `/admin/users/signup-requests/${user._id}`,
	},
}).catch(async(error) => {
	await user.remove();

	throw new ResponseError({ type: 500, msg: "Sending mail failed", error });
});

/**
 * @function verifyHandler Get user based on verify token an make the user verified
 * @param {String} key Unique key to verify user email
 * @returns {Object} Returns user
 */
module.exports = async(token) => {
	const user = await UserModel.findOne({ "meta.deleted": false, "meta.validation": { isValidated: false, token } }).exec();
	const admins = await UserModel.find({ "meta.deleted": false, "meta.isAdmin": true }).select("data.email").exec();

	const adminEmails = admins.reduce((acc, admin) => [...acc, admin.data.email], []);

	if (!user) {
		throw new Error({ type: 400, msg: "Invalid token!" });
	}

	user.meta.status.type = "PENDING";
	user.meta.validation.isValidated = true;

	await Promise.all([
		mailToAdmins(user, adminEmails),
	]);

	await user.save();

	await user.populateCompany();

	return user.toObject();
};
