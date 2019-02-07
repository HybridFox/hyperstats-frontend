const { setActiveProp } = require("./helpers");

module.exports = (req, res, next) => {
	setActiveProp(req.params.id, true)
		.then((company) => res.status(200).json(company))
		.then((error) => next(error));
};
