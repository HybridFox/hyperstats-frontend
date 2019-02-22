const { setActiveProp } = require("./helpers/recyclingProcessManager");

module.exports = (req, res, next) => {
	setActiveProp(req.params.id, false)
		.then((result) => res.status(200).json(result))
		.then((error) => next(error));
};
