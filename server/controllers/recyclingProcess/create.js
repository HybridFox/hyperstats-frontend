const recyclingProcessManager = require('./helpers/recyclingProcessManager');

module.exports = async (req, res, next) => {
	const data = await recyclingProcessManager.create(req.body);
	res.status(201).json(data);
}
