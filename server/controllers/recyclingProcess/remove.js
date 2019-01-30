const recyclingProcessManager = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	const id = req.params.id;
	recyclingProcessManager.remove(id)
		.then(() => {
			res.status(204).send();
		}, next);
};
