const recyclingProcessManager = require('./helpers/recyclingProcessManager');

module.exports = async (req, res, next) => {
	const data = await recyclingProcessManager.getAll();
	console.log(data);
	res.status(200).json(data);
}
