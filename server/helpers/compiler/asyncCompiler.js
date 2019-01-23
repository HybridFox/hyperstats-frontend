const { compile } = require("handlebars");

process.on("message", (message) => {
	const { correlationId, template, data } = message;

	const parsed = compile(template, { noEscape: true })(data);

	process.send({ correlationId, data: parsed });
});
