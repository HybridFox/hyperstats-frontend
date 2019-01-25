const recyclingProcessManager = require('./helpers/recyclingProcessManager');

module.exports = (req, res, next) => {
	recyclingProcessManager.update(req.body)
		.then((data) => {
			res.status(200).json(data);
		}, next);
}
