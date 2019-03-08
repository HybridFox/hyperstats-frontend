const path = require("path");
const mailer = require("../../../helpers/mail");
const ResponseError = require("../../../helpers/errors/responseError");

const resendValidateMail = (user) => mailer({
	to: user.email,
	subject: "Rare - Confirm registration",
	templatePath: path.resolve(process.cwd(), "controllers/auth/templates/registerConfirm.html"),
	data: {
		firstname: user.firstname,
		confirmPath: `/api/auth/verify?token=${user.validation.token}`,
	},
}).catch(async(error) => {
	await user.remove();

	throw new ResponseError({ type: 500, msg: "Sending mail failed", error });
});

const processRequest = async(body) => {
	await Promise.all([
		resendValidateMail(body.user),
	]);
};

module.exports = async(body) => {
	return processRequest(body);
};
