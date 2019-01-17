const fs = require("fs");
const { promisify } = require("util");
const { createTransport } = require("nodemailer");
const compiler = require("./compiler");
const config = require("../config");

const transporter = createTransport({
	host: "smtp.sendgrid.net",
	port: 465,
	secure: true,
	auth: {
		user: "apikey",
		pass: "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",
	},
});

const readFile = promisify(fs.readFile).bind(fs);

/**
 * @function mail Send email using handlebars parser
 * @param {Object} options Options
 * @param {String} options.to Mail destination
 * @param {String} options.subject Mail subject
 * @param {String} [option.template] Template to render
 * @param {String} [options.templatePath] path to template file
 * @param {Object} [options.data] Data for render
 */
module.exports = async({
	to,
	subject,
	template,
	templatePath,
	data,
}) => {
	const rawTemplate = templatePath ? await readFile(templatePath) : template;
	const parsedTemplate = await compiler(rawTemplate.toString(), {
		frontendHostname: config.server.frontendHostname,
		...data,
	});

	return transporter.sendMail({
		to, // user.data.email,
		subject, // "Registration confirmation",
		html: parsedTemplate, //`Complete registration <a href="${config.server.frontendHostname}/api/auth/verify?token=${user.meta.validation.token}">here</a>`,

	});
};
