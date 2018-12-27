const packageJson = require(`${process.cwd()}/package.json`);

module.exports = (req, res) => {
	res.status(200).json({
		success: true,
		version: packageJson.version,
	});
};
