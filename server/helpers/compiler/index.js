const { join } = require("path");
const { fork } = require("child_process");
const { v4: uuid } = require("node-uuid");
const childProcess = fork(join(__dirname, "./asyncCompiler.js"), {
	execArgv: ["--inspect=0"], // take any free inspect port
});

const cleanExit = () => process.exit();
process.on("SIGINT", cleanExit); // catch ctrl-c
process.on("SIGTERM", cleanExit); // catch kill
process.on("exit", () => childProcess.kill());

childProcess.on("exit", (msg) => console.log("child process exited:", msg)); // eslint-disable-line

/**
 * @function compiler Async template compiler
 * @param {String} template Template to render
 * @param {Object} data Data to render
 * @returns {Promise<String>} Rendered template
 */
module.exports = (template, data) => new Promise((resolve, reject) => {
	const correlationId = uuid();

	childProcess.send({ template, data, correlationId });

	childProcess.on("message", (message) => {
		if (message.correlationId !== correlationId) {
			return;
		}

		if (message.error) {
			reject(message.error);
		} else {
			resolve(message.data);
		}
	});
});
