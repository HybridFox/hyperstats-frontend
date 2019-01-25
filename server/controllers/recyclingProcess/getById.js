const recyclingProcessManager = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	const id = req.data.params.id;
	recyclingProcessManager.getById(id)
		.then((data) => {
			res.status(200).json(data);
		}, next);
};
