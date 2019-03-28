const recyclingProcessManager = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	recyclingProcessManager.remove(req.data.params.id)
		.then(() => {
			res.status(204).send();
		}, next);
};
