const recyclingProcessManager = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	const id = req.params.id;
	recyclingProcessManager.update(id, req.body)
		.then((data) => {
			res.status(200).json(data);
		}, next);
};
