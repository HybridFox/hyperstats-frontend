const recyclingProcessManager = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	recyclingProcessManager.getAll()
		.then((data) => {
			res.status(200).json(data);
		}, next);
};
