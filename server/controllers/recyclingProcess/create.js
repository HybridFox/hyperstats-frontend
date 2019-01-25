const recyclingProcessManager = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	recyclingProcessManager.create(req.body)
		.then((data) => {
			res.status(201).json(data);
		}, next);
};
