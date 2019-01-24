const recyclingProcessManager = require('./helpers/recyclingProcessManager');

module.exports = async (req, res, next) => {
	const data = await recyclingProcessManager.getAll();
	res.status(200).json(data);
}
