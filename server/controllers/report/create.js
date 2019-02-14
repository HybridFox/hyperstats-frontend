const { create } = require("./helpers");

module.exports = (req, res, next) => {
	return create(req.data.body)
		.then((report) => res.status(201).json(report))
		.catch((error) => next(error));
};
